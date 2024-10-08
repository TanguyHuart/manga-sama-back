const mangaDataMapper = require("../dataMappers/mangaDataMapper");
const mangaService = require("../services/mangaAPI");

// Pour la règle et le respect des conventions du Routeur l'isbn arrivant par les pararms est noté {isbn} alors que par le body, il porte le nom de la colonne dans la base de données {code_isbn}
const mangaController = {
  // Récupère tous les mangas de la base de données
  getAllMangas: async (request, response, next) => {
    try {
      const mangas = await mangaDataMapper.findAllMangas();
      if (!mangas) {
        return next();
      }

      response.status(200).json(mangas);
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // 🌍 Crée une entrée dans la base de données à partir d'un ISBN
  getMangaInfos: async (request, response) => {
    try {
      const { isbn } = request.params;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!isbn) {
        return response.json({
          status: 400,
          error: "L'ISBN est manquant."
        });
      }

      try {
        const unformattedIsbn = isbn;
        console.log(unformattedIsbn);
        // Récupère les informations du manga
        const mangaInfo = await mangaService.mangaAPI(unformattedIsbn);
        console.log(`༼ つ ◕_◕ ༽つ l'API a marché on a chopé le manga`);
        console.log(mangaInfo);
        if (mangaInfo) {
          // Insère les informations du manga en base de données
          const insertedManga = await mangaDataMapper.insertOneManga({
            code_isbn: mangaInfo.code_isbn,
            title: mangaInfo.title,
            volume: mangaInfo.volume,
            year_publication: mangaInfo.year_publication,
            author: mangaInfo.author,
            description: mangaInfo.description,
            cover_url: `https://manga-sama-back-production.up.railway.app/images/${mangaInfo.code_isbn}`,
            category_id: mangaInfo.category_id
          });

          if (insertedManga) {
            // La création s'est bien déroulée
            console.log("Le manga a été créé avec succès :", insertedManga);
            return response.status(201).json(insertedManga);
          } else {
            // Aucune ligne affectée, la création n'a pas été effectuée
            return response.json({
              status: 200,
              success: false,
              message:
                "Aucun manga n'a été créé, peut-être que le manga existe déjà"
            });
          }
        } else {
          // MangaInfo est null, indique un problème lors de la récupération des informations du manga
          return response.json({
            status: 404,
            success: false,
            message: "Les informations du manga n'ont pas pu être récupérées."
          });
        }
      } catch (error) {
        console.log(error);
        return response.json({
          status: 500,
          success: false,
          error: {
            message: error.toString()
          }
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Crée un nouveau manga dans la base de données
  createOneManga: async (request, response) => {
    try {
      const {
        code_isbn,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id
      } = request.body;

      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (
        !code_isbn ||
        !title ||
        !volume ||
        !year_publication ||
        !author ||
        !description ||
        !cover_url ||
        !category_id
      ) {
        return response.status(400).json({
          error: "Missing body parameter"
        });
      }
      const newManga = await mangaDataMapper.insertOneManga({
        code_isbn,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id
      });

      if (newManga) {
        // La création s'est bien déroulée
        console.log("Le manga a été créé avec succès");
        return response.json({
          status: 201,
          success: true,
          message: "Le manga a été créé avec succès",
          manga: newManga
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message:
            "Aucun manga n'a été créé, peut-être que le manga existe déjà"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Récupère un manga par son code isbn
  getOneMangaById: async (request, response) => {
    try {
      const { isbn } = request.params;
      const manga = await mangaDataMapper.findOneMangaById(isbn);
      // Si Aucun manga trouvé on essaye avec l'API
      if (!manga) {
        const unformattedIsbn = isbn;
        return response.redirect(`/manga/API/${unformattedIsbn}`);
      }
      // Le manga existe et il a été trouvé dans le base de données il est retourné
      return response.status(200).json(manga);
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  modifyOneMangaById: async (request, response) => {
    try {
      const { isbn } = request.params; // Sachant que l'ISBN est unique et ne peut être modifié
      const code_isbn = isbn;

      const {
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id
      } = request.body;

      if (!code_isbn || !title || !author || !description || !cover_url) {
        return response.json({
          status: 400,
          error: "Paramètre manquant dans le corps de la requête HTTP"
        });
      }

      const modifiedManga = await mangaDataMapper.updateOneManga({
        code_isbn,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id
      });

      if (modifiedManga) {
        // La modification s'est bien déroulée
        return response.json({
          status: 201,
          success: true,
          message: "Le manga a été modifié avec succès",
          manga: modifiedManga
        });
      } else {
        // Aucune ligne affectée, la modification n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "Aucun manga n'a été modifié"
        });
      }
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },

  // Supprime un manga par son code ISBN
  removeOneMangaById: async (request, response) => {
    try {
      const { isbn } = request.params; // Sachant que l'ISBN est unique et ne peut être modifié
      const code_isbn = isbn;
      const manga = await mangaDataMapper.deleteOneMangaById(code_isbn);
      if (!manga) {
        // Aucun manga trouvé, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucun manga trouvé avec le code isbn spécifié"
        });
      }
      return response.json({
        status: 200,
        success: true,
        message: "Manga supprimé avec succès"
      });
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  }
};

module.exports = mangaController;
