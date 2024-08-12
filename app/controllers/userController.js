const validator = require("email-validator");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const emailService = require("../services/mail/emailService.js");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const userDataMapper = require("../dataMappers/userDataMapper");

const userController = {
  // Récupère tous les utilisateurs de la base de données
  getAllUsers: async (request, response, next) => {
    try {
      const users = await userDataMapper.findAllusers();
      if (!users) {
        return next();
      }
      response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Crée un nouvel utilisateur dans la base de données
  createOneUser: async (request, response) => {
    try {
      const { pseudo, email, password, passwordConfirmation } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        typeof pseudo !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof passwordConfirmation !== "string"
      ) {
        return response.json({
          status: 400,
          error:
            "Paramètre manquant ou type incorrect dans le corps de la requête HTTP"
        });
      }

      // Définition d'une expression régulière (regex) pour les noms contenant uniquement des caractères latins
      const nameRegex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;

      // Définition du schéma de validation avec Joi
      const schema = Joi.object({
        // Champ 'pseudo' avec validation Joi
        pseudo: Joi.string().min(2).regex(nameRegex).required().messages({
          "string.min": "Le pseudo doit contenir au moins 2 caractères",
          "string.pattern.base":
            "Le pseudo doit contenir uniquement des caractères latins"
        }),

        // Champ 'password' avec validation Joi et regex pour des exigences spécifiques
        password: Joi.string()
          .min(8)
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]+$/
          )
          .required()
          .messages({
            "string.min": "Le mot de passe doit contenir au moins 8 caractères",
            "string.pattern.base":
              "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial parmi !@#$%^&*"
          }),

        // Champ 'passwordConfirmation' avec validation Joi, vérifiant qu'il correspond au champ 'password'
        passwordConfirmation: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .messages({
            "any.only":
              "La confirmation du mot de passe doit correspondre au mot de passe"
          })
      });

      // Application du schéma à un objet contenant les champs 'password' et 'passwordConfirmation'
      const validation = schema.validate({
        pseudo,
        password,
        passwordConfirmation
      });

      // Vérification des erreurs de validation
      if (validation.error) {
        // Retourne une réponse JSON avec le statut 400 en cas d'erreur de validation
        return response.json({
          status: 400,
          error: validation.error.message
        });
      }
      // Vérifie si l'e-mail est valide en utilisant un module externe 'validator'
      if (!validator.validate(email)) {
        return response.json({
          status: 400,
          error: "L'adresse e-mail fournie n'est pas valide"
        });
      }

      // Vérifie si l'utilisateur existe déjà dans la base de données
      const userFound = await userDataMapper.findOneUserByEmail(email);
      if (userFound) {
        return response.json({
          status: 400,
          error: "Cet utilisateur existe déjà dans la base de données."
        });
      }

      // Vérifie si le mot de passe et sa confirmation correspondent
      if (password !== passwordConfirmation) {
        return response.json({
          status: 400,
          error: "Le mot de passe et la confirmation ne correspondent pas"
        });
      }

      // Hash du mot de passe avec bcrypt avant de le stocker
      const encryptedPassword = bcrypt.hashSync(password, 10);

      // Continue avec la création de l'utilisateur si l'e-mail n'existe pas encore
      const newUser = await userDataMapper.insertOneUser({
        pseudo,
        email,
        password: encryptedPassword
      });

      if (newUser) {
        // Si la création de l'utilisateur s'est bien déroulée
        console.log("L'utilisateur a été créé avec succès");
        try {
          // Génère un token JWT en utilisant la clé secrète et spécifiant une expiration d'une heure
          const token = jwt.sign(
            { userId: newUser.id, role: newUser.role_id },
            jwtConfig.jwtSecretKey,
            { expiresIn: "1h" }
          );
          // Envoi d'un e-mail de confirmation ✉
          await emailService.sendConfirmationEmail(email);
          // Retourne une réponse avec le statut 200 et les données de l'utilisateur ainsi que le token
          return response.status(201).json({
            success: true,
            message: "Inscription réussie. Email de confirmation envoyé.",
            user: newUser,
            token: token
          });
        } catch (error) {
          console.error(error);
          response.status(500).json({
            message: "Erreur lors de l'envoi de l'e-mail de confirmation."
          });
        }
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été créé avec succès",
          user: newUser
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message:
            "Aucun utilisateur n'a été créé, peut-être que l'utilisateur existe déjà"
        });
      }
    } catch (error) {
      // Gestion des erreurs - retourne une réponse avec le statut 500 en cas d'erreur
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.message
        }
      });
    }
  },

  // Récupère un utilisateur par son code id
  getOneUserById: async (request, response) => {
    try {
      const { id } = request.params;

      const user = await userDataMapper.findOneUserById(id);
      if (!user) {
        // Aucune utilisateur trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun utilisateur trouvé avec le code id spécifié"
        });
      }
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Modifie un utilisateur par son id
  modifyOneUserById: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number
      } = request.body;
      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        (typeof lastname !== "string" && lastname !== null) ||
        (typeof firstname !== "string" && firstname !== null) ||
        (typeof pseudo !== "string" && pseudo !== null) ||
        (typeof birthdate !== "string" && birthdate !== null) ||
        (typeof address !== "string" && address !== null) ||
        (typeof zip_code !== "string" && zip_code !== null) ||
        (typeof city !== "string" && city !== null) ||
        (typeof phone_number !== "string" && phone_number !== null)
      ) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      // Définition d'une expression régulière (regex) pour les noms contenant uniquement des caractères latins
      const nameRegex = /^[a-zA-ZÀ-ÿ0-9\s]*$/;

      // Définition du schéma de validation avec Joi
      const schema = Joi.object({
        // Champ 'lastname' avec validation Joi
        lastname: Joi.string().allow(null, '').min(1).regex(nameRegex).required().messages({
          "string.pattern.base":
            "Le nom doit contenir uniquement des caractères latins"
        }),

        // Champ 'firstname' avec validation Joi
        firstname: Joi.string().allow(null, '').min(1).regex(nameRegex).required().messages({
          "string.pattern.base":
            "Le prénom doit contenir uniquement des caractères latins"
        }),

        // Champ 'pseudo' avec validation Joi
        pseudo: Joi.string().min(2).regex(nameRegex).required().messages({
          "string.min": "Le pseudo doit contenir au moins 2 caractères",
          "string.pattern.base":
            "Le pseudo doit contenir uniquement des caractères latins"
        })
      });

      // Application du schéma à un objet contenant les champs 'password' et 'passwordConfirmation'
      const validation = schema.validate({ lastname, firstname, pseudo });

      // Vérification des erreurs de validation
      if (validation.error) {
        // Retourne une réponse JSON avec le statut 400 en cas d'erreur de validation
        return response.json({
          status: 400,
          error: validation.error.message
        });
      }

      // Continue avec la modification de l'utilisateur si les informations passent les vérfications

      const modifiedUser = await userDataMapper.updateOneUser({
        id,
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number
      });

      if (modifiedUser) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été modifié avec succès",
          user: modifiedUser
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun utilisateur n'a été modifié"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  modifyOneUserEmailById: async (request, response) => {
    try {
      const { id } = request.params;
      const { email } = request.body;
      if (typeof email !== "string") {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      // Vérifie si l'e-mail est valide en utilisant un module externe 'validator'
      if (!validator.validate(email)) {
        return response.json({
          status: 400,
          error: "L'adresse e-mail fournie n'est pas valide"
        });
      }
      // Vérifie si l'utilisateur existe déjà dans la base de données
      const userFound = await userDataMapper.findOneUserByEmail(email);
      if (userFound) {
        return response.json({
          status: 400,
          error: "Cet utilisateur existe déjà dans la base de données."
        });
      }
      // Continue avec la modification de l'utilisateur si les informations passent les vérfications

      const modifiedUserEmail = await userDataMapper.updateOneUserEmail({
        id,
        email
      });

      if (modifiedUserEmail) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'email a été modifié avec succès",
          user: modifiedUserEmail
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun email n'a été modifié"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Permet à l'admin de modifier un utilisateur et de changer ses rôles
  adminModifyOneUserById: async (request, response) => {
    try {
      const { id } = request.params;

      const {
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number,
        email,
        password,
        role_id
      } = request.body;

      const adminModifiedUser = await userDataMapper.adminUpdateOneUser({
        id,
        lastname,
        firstname,
        pseudo,
        birthdate,
        address,
        zip_code,
        city,
        phone_number,
        email,
        password,
        role_id
      });

      if (adminModifiedUser) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'utilisateur a été modifié avec succès",
          user: adminModifiedUser
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun utilisateur n'a été modifié"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Supprime un utilisateur par son code ID
  removeOneUserById: async (request, response) => {
    const { id } = request.params;
    try {
      const user = await userDataMapper.deleteOneUserById(id);
      if (!user) {
        // Aucun utilisateur trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun utilisateur trouvé avec le code id spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Utilisateur supprimé avec succès"
      });
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  }
};

module.exports = userController;
