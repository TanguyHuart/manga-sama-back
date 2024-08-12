// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controlleur
const roleController = require("../controllers/roleController");

// Import du middleware d'authentification
const {
  authenticateMiddleware , roleMiddleware 
} = require("../middlewares/authenticationMiddleware");

// Routes correspondant aux rôles utilisateur
router
  .route("/")
  .get(roleController.getAllRoles)
  .post(authenticateMiddleware, roleMiddleware,roleController.createOneRole);

// Routes correspondant à un role spécifique
router
  .route("/:id")
  .get(roleController.getOneRoleById)
  .patch(authenticateMiddleware, roleMiddleware,roleController.modifyOneRoleById)
  .delete(authenticateMiddleware, roleMiddleware,roleController.removeOneRoleById);

// Export
module.exports = router;
