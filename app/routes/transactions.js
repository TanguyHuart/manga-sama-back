// Import d'express et du router
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Ajout du Middleware d'authentification sécurisée
router.use(authenticateMiddleware);

// Route pour débuter la transaction
router.route("/")
  .post(transactionController.addTransaction);

// Export
module.exports = router;
