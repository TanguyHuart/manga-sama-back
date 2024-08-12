// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const userController = require("../controllers/userController");

// Import du middleware d'authentification
const {
  authenticateMiddleware,userOwnerMiddleware
} = require("../middlewares/authenticationMiddleware");

// Route correspondant aux utilisateurs
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createOneUser);

// Route correspondant à un utilisateur spécifique
router
  .route("/:id")
  .get(authenticateMiddleware,userOwnerMiddleware, userController.getOneUserById)
  .put(authenticateMiddleware,userOwnerMiddleware,  userController.modifyOneUserById)
  .patch(authenticateMiddleware,userOwnerMiddleware,  userController.modifyOneUserEmailById)
  // .patch(authenticateMiddleware,userOwnerMiddleware, userController.modifyOneUserPasswordById) Route de moficiation de mot de passe
  .delete(authenticateMiddleware,userOwnerMiddleware,  userController.removeOneUserById);


// Export
module.exports = router;

//TODO! : route de reset de mot de passe
