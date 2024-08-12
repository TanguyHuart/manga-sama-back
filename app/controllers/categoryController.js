const categoryDataMapper = require("../dataMappers/categoryDataMapper");
const categoryController = {
  // Récupère toutes les catégories d'un manga de la base de données
  getAllCategories: async (request, response, next) => {
    try {
      const categories = await categoryDataMapper.findAllCategories();
      if (!categories) {
        return next();
      }
      response.json(categories);
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

  // Crée une nouvelle catégorie de manga dans la base de données
  createOneCategory: async (request, response) => {
    try {
      const { category_name } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!category_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const newCategory = await categoryDataMapper.insertOneCategory({
        category_name
      });

      if (newCategory) {
        // La création s'est bien déroulée
        console.log("La catégorie a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "La catégorie a été créé avec succès",
          category: newCategory
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message:
            "Aucune catégorie n'a été créé, peut-être que la catégorie existe déjà"
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

  // Récupère une catégorie par son id
  getOneCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const category = await categoryDataMapper.findOneCategoryById(id);
      if (!category) {
        // Aucun category trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune catégorie trouvé avec le code id spécifié"
        });
      }
      return response.json(category);
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

  // Modifie une catégorie par son id
  modifyOneCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const { category_name } = request.body;

      if (!category_name) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }
      const modifiedCategory = await categoryDataMapper.updateOneCategory({
        category_name,
        id
      });

      if (modifiedCategory) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "La catégorie a été modifié avec succès",
          category: modifiedCategory
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucune catégorie n'a été modifié"
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

  // Supprime une par son code id
  removeOneCategoryById: async (request, response) => {
    try {
      const { id } = request.params;
      const category = await categoryDataMapper.deleteOneCategoryById(id);

      if (!category) {
        // Aucun catégorie trouvée, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune catégorie trouvé avec le code id spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Catégorie supprimée avec succès"
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

module.exports = categoryController;
