// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const categoryController = require("../controllers/categoryController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Routes correspondant aux catégories
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(authenticateMiddleware, categoryController.createOneCategory);

// Routes correspondant à une catégorie spécifique
router
  .route("/:id")
  .get(categoryController.getOneCategoryById)
  .patch(authenticateMiddleware, categoryController.modifyOneCategoryById)
  .delete(authenticateMiddleware, categoryController.removeOneCategoryById);

// Export
module.exports = router;
