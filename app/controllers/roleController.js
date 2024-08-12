const roleDataMapper = require("../dataMappers/roleDataMapper");

const roleController = {
  // Récupère toutes les roles d'un utilisateur de la base de données
  getAllRoles: async (request, response, next) => {
    try {
      // Vérifier si l'utilisateur a le rôle d'administrateur
      const roles = await roleDataMapper.findAllRoles();
      if (!roles) {
        return next();
      }
      response.status(200).json(roles);
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

  // Crée un nouveau rôle dans la base de données
  createOneRole: async (request, response) => {
    try {
      const { role_name } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!role_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const newRole = await roleDataMapper.insertOneRole({
        role_name
      });

      if (newRole) {
        // La création s'est bien déroulée
        console.log("le rôle a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "le rôle a été créé avec succès",
          role: newRole
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun rôle n'a été créé, peut-être que le rôle existe déjà"
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

  // Récupère un rôle par son id
  getOneRoleById: async (request, response) => {
    try {
      const { id } = request.params;

      const role = await roleDataMapper.findOneRoleById(id);
      if (!role) {
        // Aucun role trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun rôle trouvé avec le code id spécifié"
        });
      }
      return response.status(200).json(role);
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

  // Modifie un rôle par son id
  modifyOneRoleById: async (request, response) => {
    try {
      const { id } = request.params;

      const { role_name } = request.body;

      if (!role_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const modifiedRole = await roleDataMapper.updateOneRole({
        role_name,
        id
      });

      if (modifiedRole) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "le rôle a été modifié avec succès",
          role: modifiedRole
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun rôle n'a été modifié"
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

  // Supprime un rôle par son code id
  removeOneRoleById: async (request, response) => {
    try {
      const { id } = request.params;

      const role = await roleDataMapper.deleteOneRoleById(id);
      if (!role) {
        // Aucun rôle trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun rôle trouvé avec le code id spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Role supprimé avec succès"
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

module.exports = roleController;
