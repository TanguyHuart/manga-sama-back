// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import des controleurs
const articleController = require("../controllers/articleController");

// Import du middleware d'authentification
const {
  authenticateMiddleware
} = require("../middlewares/authenticationMiddleware");

// Récupère toutes les annonces en lien avec un manga particulier
router.route("/article/manga/:isbn").get(articleController.getArticlesByManga);

// Associe un manga à un article par la table de relation manga_has_article
router
  .route("/article/manga/:articleId/:isbn")
  .post(authenticateMiddleware, articleController.linkOneMangaToOneArticle);

// Récupère toutes les annonces en lien avec un user particulier
router.route("/user/:userId/article/").get(articleController.getArticlesByUser);

// Associe un utilisateur à un article par la table de relation user_has_article
router
  .route("/user/article/:userId/:articleId")
  .post(authenticateMiddleware, articleController.linkOneUserToOneArticle);

// Export
module.exports = router;
