const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt");
const userDataMapper = require("../dataMappers/userDataMapper");
const tokensBlacklist = require("../middlewares/authenticationMiddleware");

const authenticationController = {
  // Fonction pour la connexion de l'utilisateur
  loginUser: async (request, response) => {
    try {
      // Récupération des données d'authentification depuis le corps de la requête
      const { email, password } = request.body;

      // Vérifie si l'utilisateur existe dans la base de données
      const user = await userDataMapper.findOneUserByEmail(email);
      if (!user) {
        // Retourne une réponse d'erreur si l'utilisateur n'est pas trouvé
        return response
          .status(401)
          .json({ message: "Adresse e-mail ou mot de passe incorrect." });
      }

      // Vérifie si le mot de passe est correct en comparant avec le hash stocké
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // Retourne une réponse d'erreur si le mot de passe ne correspond pas
        return response
          .status(401)
          .json({ message: "Adresse e-mail ou mot de passe incorrect." });
      }

      // Génère un token JWT avec les infos d'un user (son id et son rôle) en utilisant la clé secrète et spécifiant une expiration d'une heure
      const token = jwt.sign(
        { userId: user.id, role: user.role_id },
        jwtConfig.jwtSecretKey,
        { expiresIn: "1h" }
      );
      console.log(token);
      // Retourne une réponse avec le statut 200 et les données de l'utilisateur ainsi que le token
      return response.status(200).json({
        success: true,
        message: "Connexion réussie",
        user: user,
        token: token
      });
    } catch (error) {
      // Gestion des erreurs - retourne une réponse avec le statut 500 en cas d'erreur
      console.log(error);
      return response.status(500).json({
        status: 500,
        success: false,
        error: {
          message: error.message
        }
      });
    }
  },

  // Fonction pour la déconnexion de l'utilisateur
  logoutUser: (request, response) => {
    try {
      // Récupération du token depuis l'en-tête de la requête
      const token = request.headers.authorization.split(" ")[1];

      // Vérification si le token existe
      if (!token) {
        return response
          .status(401)
          .json({ message: "Token manquant. Déconnexion impossible." });
      }

      // Ajoute le token à l'ensemble des tokens invalides

      // Permet de gérer des tokens invalidés de manière centralisée
      tokensBlacklist.push(token);

      // Répond avec un succès pour indiquer que la déconnexion s'est déroulée correctement
      return response.status(200).json({
        success: true,
        message: "Déconnexion réussie"
      });
    } catch (error) {
      // Gestion des erreurs - retourne une réponse avec le statut 500 en cas d'erreur
      console.log(error);
      return response.status(500).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  }
};

// Exporte le contrôleur d'authentification
module.exports = authenticationController;
