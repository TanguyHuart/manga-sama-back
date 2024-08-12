// Définition des emplacements des dossiers d'images
const mangaCoverLocation = "../../public/images";
const articleImageLocation = "../../public/uploads/article/";
const userImageLocation = "../../public/uploads/user";

// Importation des modules nécessaires
const path = require("path");
const fs = require("fs");
const userDataMapper = require("../dataMappers/userDataMapper");
const articleDataMapper = require("../dataMappers/articleDataMapper");

// Contrôleur d'images
const imageController = {
  // Méthode pour envoyer une cover de manga par son ID
  sendOneCoverById: async (request, response) => {
    try {
      const { id } = request.params;
      const mangaCover = path.join(__dirname, mangaCoverLocation, `${id}.jpg`);
      console.log("Une cover de manga va être envoyée : " + mangaCover);

      // Vérifier si l'image existe
      if (!fs.existsSync(mangaCover)) {
        // Aucune image trouvée, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune couverture trouvée pour l'image demandée"
        });
      }

      // Envoyer le fichier de l'image en réponse
      return response.sendFile(mangaCover);
    } catch (error) {
      console.log(error);

      // En cas d'erreur, renvoyer une réponse JSON avec le statut 500 (Internal Server Error)
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Méthode pour envoyer une image d'utilisateur par son ID
  sendOneUserImageById: async (request, response) => {
    try {
      const { id } = request.params;
      const userImage = path.join(__dirname, userImageLocation, `${id}.jpg`);
      console.log(
        "Une photo de profil d'un utilisateur va être envoyée : " + userImage
      );

      // Vérifier si l'image existe
      if (!fs.existsSync(userImage)) {
        // Aucune image trouvée, renvoyer une réponse 404 Not Found
        return response.status(404).json({
          status: 404,
          success: false,
          message: "Aucune image trouvée pour l'utilisateur demandé"
        });
      }

      // Envoyer le fichier de l'image en réponse
      console.log(userImage);
      return response.sendFile(userImage);
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyer une réponse JSON avec le statut 500 (Internal Server Error)
      return response.status(500).json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Méthode pour télécharger une image d'utilisateur
  uploadImageUser: async (request, response) => {
    try {
      const { id } = request.params;
      const { filename } = request.file;

      // Enregistrez le nom de fichier dans la base de données pour l'utilisateur
      const image_profile_url = `http://localhost:3000/images/uploads/user/${
        filename.split(".")[0]
      }`;
      const updatedUser = await userDataMapper.insertImageProfileByUserId(
        id,
        image_profile_url
      );

      if (!updatedUser) {
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
      }

      // Envoyez une réponse JSON indiquant le succès de l'upload
      response.status(202).json({
        updatedUser,
        message: "Image téléchargée avec succès pour l'utilisateur"
      });
      console.log(
        "L'image de profil de l'utilisateur a été mise à jour : " +
          image_profile_url
      );
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyer une réponse JSON avec le statut 500 (Internal Server Error)
      response
        .status(500)
        .json({ error: "Erreur lors de l'upload de l'image" });
    }
  },

  // Méthode pour envoyer une image d'article par son ID
  sendOneArticleImageById: async (request, response) => {
    try {
      const { id } = request.params;
      const articleImage = path.join(
        __dirname,
        articleImageLocation,
        `${id}.jpg`
      );
      console.log("Une photo d'un article va être envoyée : " + articleImage);

      // Vérifier si l'image existe
      if (!fs.existsSync(articleImage)) {
        // Aucune image trouvée, renvoyer une réponse 404 Not Found
        return response.status(404).json({
          status: 404,
          success: false,
          message: "Aucune image trouvée pour l'article demandé"
        });
      }

      // Envoyer le fichier de l'image en réponse
      return response.sendFile(articleImage);
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyer une réponse JSON avec le statut 500 (Internal Server Error)
      return response.status(500).json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Méthode pour télécharger une image d'article
  uploadImageArticle: async (request, response) => {
    try {
      const { id } = request.params;
      const { filename } = request.file;

      // Enregistrez le nom de fichier dans la base de données pour l'article
      const photo_url = `http://localhost:3000/images/uploads/article/${
        filename.split(".")[0]
      }`;
      const updatedArticle = await articleDataMapper.insertImageByArticleId(
        id,
        photo_url
      );

      // Envoyez une réponse JSON indiquant le succès de l'upload
      response.status(202).json({
        updatedArticle,
        message: "Image téléchargée avec succès pour l'article"
      });
      console.log("L'image de l'article a été mise à jour : " + photo_url);
    } catch (error) {
      console.error(error);

      // En cas d'erreur, renvoyer une réponse JSON avec le statut 500 (Internal Server Error)
      response
        .status(500)
        .json({ error: "Erreur lors de l'upload de l'image" });
    }
  }
};

// Exporter le contrôleur d'images
module.exports = imageController;
