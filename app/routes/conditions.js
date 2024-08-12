// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const conditionController = require("../controllers/conditionController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Routes correspondant à l'état des mangas
router
  .route("/")
  .get(conditionController.getAllConditions)
  .post(authenticateMiddleware, conditionController.createOneCondition);

// Routes correspondant à un état spécifique
router
  .route("/:id")
  .get(authenticateMiddleware, conditionController.getOneConditionById)
  .patch(authenticateMiddleware, conditionController.modifyOneConditionById)
  .delete(authenticateMiddleware, conditionController.removeOneConditionById);

// Export
module.exports = router;
