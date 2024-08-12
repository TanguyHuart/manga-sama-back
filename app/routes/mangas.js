// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import du controleur
const mangaController = require("../controllers/mangaController");

// Import du middleware d'authentification
const {
  authenticateMiddleware, roleMiddleware
} = require("../middlewares/authenticationMiddleware");

// Routes correspondant aux mangas
router
  .route("/")
  .get(mangaController.getAllMangas)
  .post(authenticateMiddleware, mangaController.createOneManga);

// Routes correspondant à un manga spécifique
router
  .route("/:isbn")
  .get(authenticateMiddleware, mangaController.getOneMangaById)
  .put(authenticateMiddleware,roleMiddleware, mangaController.modifyOneMangaById)
  .delete(authenticateMiddleware,roleMiddleware, mangaController.removeOneMangaById);

// Route d'API d'insertion d'un nouveau manga en base de données
router.route("/API/:isbn").get(mangaController.getMangaInfos);

// Export
module.exports = router;
