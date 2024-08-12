const conditionDataMapper = require("../dataMappers/conditionDataMapper");


const conditionController = {
  // Récupère tous les états d'un manga de la base de données
  getAllConditions: async (request, response, next) => {
    
    try {
      const conditions = await conditionDataMapper.findAllConditions();
      if (!conditions) {
        return next();
      }
      response.status(200).json(conditions);
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

  // Crée un nouvel état de manga dans la base de données
  createOneCondition: async (request, response) => {
    try {
      const { condition_name } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!condition_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const newCondition = await conditionDataMapper.insertOneCondition({
        condition_name
      });

      if (newCondition) {
        // La création s'est bien déroulée
        console.log("L'état a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "L'état a été créé avec succès",
          condition: newCondition
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun état n'a été créé, peut-être que l'état existe déjà"
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

  // Récupère un état par son code id
  getOneConditionById: async (request, response) => {
    try {
      const { id } = request.params;

      const condition = await conditionDataMapper.findOneConditionById(id);
      if (!condition) {
        // Aucun état trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun état trouvé avec le code id spécifié"
        });
      }
      return response.status(200).json(condition);
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

  modifyOneConditionById: async (request, response) => {
    try {
      const { id } = request.params;

      const { condition_name } = request.body;

      if (!condition_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const modifiedCondition = await conditionDataMapper.updateOneCondition({
        id,
        condition_name
      });

      if (modifiedCondition) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "L'état a été modifié avec succès",
          condition: modifiedCondition
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun état n'a été modifié"
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

  // Supprime un état par son code ISBN
  removeOneConditionById: async (request, response) => {
    try {
      const { id } = request.params;

      const condition = await conditionDataMapper.deleteOneConditionById(id);
      if (!condition) {
        // Aucun état trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun état trouvé avec le code id spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "État supprimé avec succès"
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

module.exports = conditionController;
