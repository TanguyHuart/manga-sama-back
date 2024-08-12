// Import d'express et du router
const express = require("express");
const router = express.Router();
// Import du controlleur
const imageController = require("../controllers/imageController");
// Import du middleware Multer
const multerMiddleware = require("../middlewares/multer");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Routes des couvertures de mangas
router.route("/:id").get(imageController.sendOneCoverById);

//  Routes des images de profil mises en lignes par les utilisateurs
router
  .route("/uploads/user/:id")
  .get(imageController.sendOneUserImageById)
  .post(
    authenticateMiddleware,
    multerMiddleware.uploadUser,
    imageController.uploadImageUser
  );

// Routes des photos de mangas mises en lignes par les utilisateurs
router
  .route("/uploads/article/:id")
  .get(imageController.sendOneArticleImageById)
  .post(
    authenticateMiddleware,
    multerMiddleware.uploadArticle,
    imageController.uploadImageArticle
  );

// Export
module.exports = router;
