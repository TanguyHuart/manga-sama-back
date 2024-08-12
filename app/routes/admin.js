// Import d'express et du router
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Ajout du Middleware d'authentification sécurisée
router.use(authenticateMiddleware);

// Route d'administrateur pour éditer les privilèges d'un utilisateur spécifique
router.route("/user/:id").put(userController.adminModifyOneUserById);

// Export
module.exports = router;
