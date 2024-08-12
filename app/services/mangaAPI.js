const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

// Fonction principale asynchrone
async function mangaAPI(unformattedIsbn) {
  // Vérifier si l'isbn est fourni
  if (!unformattedIsbn) {
    console.error("Veuillez fournir un isbn en tant qu'argument.");
  }
  console.log("isbn non formaté :" +unformattedIsbn);
  // Construire l'URL en utilisant l'isbn
  // Retirer les tirets de l'ISBN

  const isbn = parseInt(unformattedIsbn.replace(/-/g, ''));
  const url = `https://www.decitre.fr/livres/${isbn}.html`;
  console.log("isbn formaté :" +isbn);
  // Fonction pour télécharger la page HTML de manière asynchrone
  async function downloadHTML() {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors du téléchargement de la page HTML :",
        error.message
      );
    }
  }

  // Fonction pour extraire les informations du livre
  async function extractBookInfo() {
    // Télécharger la page HTML de manière asynchrone
    const html = await downloadHTML();

    // Charger le HTML dans Cheerio
    const $ = cheerio.load(html);

    // Récupérer le titre du livre en excluant le contenu de la balise <span class="format">
    const titleElement = $(".fp-top--main-info .product-title");
    const title = titleElement
      .contents()
      .filter(function () {
        return this.nodeType === 3; // Filtrer les nœuds de texte
      })
      .text()
      .trim();

    // Fonction pour extraire le numéro de tome ou de volume (insensible à la casse)
    function extractVolumeNumber(title) {
      // Extraire le numéro de tome ou de volume (insensible à la casse)
      const match = title.match(/(?:tome|volume|t|v)\s*(\d+)|T(\d+)/i);

      if (match) {
        // Vérifier si le premier groupe de capture (pour "tome" ou "volume") est défini
        if (match[1]) {
          return parseInt(match[1], 10);
        }
        // Si le premier groupe n'est pas défini, utiliser le deuxième groupe (pour "TXX")
        return parseInt(match[2], 10) || NaN;
      }

      return null; // Utiliser null si le numéro n'est pas trouvé
    }
    // Retirer le texte "Tome xx" ou "Volume xx" du titre (insensible à la casse)
    const titleWithoutVolume = title.replace(/(tome|volume) \d+/i, "").trim();

    // Appeler la fonction pour extraire le numéro de tome ou de volume
    let volumeNumber = extractVolumeNumber(title);
    // Fonction pour extraire les noms des auteurs
    function extractAuthors() {
      const authorElements = $(".authors.authors--main h2 a");
      const authors = authorElements
        .map(function () {
          return $(this).text().trim();
        })
        .get();

      return authors.join(", ");
    }
    // Appeler la fonction pour extraire les noms des auteurs
    const mainAuthor = extractAuthors();

    // Fonction pour télécharger l'image de couverture de la meilleure résolution possible
    async function downloadCoverImage(isbn, model) {
      console.log("cherche l'image!");
      const imageUrl = `https://products-images.di-static.com/image/cover/${isbn}-475x500-${model}.jpg`;

      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer"
        });

        // Chemin où tu veux sauvegarder l'image localement (ajuste le chemin selon ta structure de projet)
        const imagePath = path.join(
          __dirname,
          "../../public/images/",
          `${isbn}.jpg`
        );

        // Sauvegarde de l'image localement avec le nouveau nom
        fs.writeFileSync(imagePath, response.data, "binary");

        return imagePath.replace(__dirname, ""); // Retourne le chemin local de l'image avec le nouveau nom
      } catch (error) {
        console.error(
          `Erreur lors du téléchargement de l'image avec le modèle ${model}:`,
          error.message
        );
        return null; // Retourne null en cas d'erreur
      }
    }

    // Fonction pour récupérer l'image de couverture
    async function getCoverImage(isbn) {
      // Modèles d'image à essayer
      const modelsToTry = [2, 1]; // Change l'ordre des modèles

      // Essayer chaque modèle en séquence
      for (const model of modelsToTry) {
        const imagePath = path.join(
          __dirname,
          "../../public/images/",
          `${isbn}-${model}.jpg`
        );

        // Vérifier si l'image existe déjà localement
        if (fs.existsSync(imagePath)) {
          return `/images/${isbn}.jpg`; // Retourner le chemin local de l'image
        }

        const downloadedImagePath = await downloadCoverImage(isbn, model);
        if (downloadedImagePath !== null) {
          // Si l'image est téléchargée avec succès, retourner le chemin local de l'image
          return downloadedImagePath;
        }
      }

      // Si aucune image n'a été téléchargée avec succès, retourner null ou gérer selon vos besoins
      return null;
    }

    // Appeler la fonction pour récupérer l'image de couverture
    const localImageUrl = await getCoverImage(isbn);

    // Récupérer la description du livre
    const description = $("#resume .content").text().trim();

    // Récupérer la date de parution
    const publicationDate = $(
      '.information:contains("Date de parution") .value'
    )
      .text()
      .trim();

    // Extraire l'année de la date (supposant que le format est toujours dd/mm/yyyy)
    const year = publicationDate.split("/")[2];

    // Récupérer le genre du livre avec le nouveau sélecteur
    const genreElement = $("#main_breadcrumb > ul > li:last-child > a > span");
    const genreText = genreElement.text().trim();

    // Retirer la chaîne "Manga" du début du genre s'il existe
    const cleanedGenre = genreText.replace(/^Mangas\s+/i, "");

    // Mapping des genres de manga aux catégories correspondantes
    const genreToCategoryMapping = {
      Shonen: 1,
      Seinen: 2,
      Shojo: 3,
      Josei: 4,
      Kodomo: 5,
      "Kodomo (enfants)": 5,
      Hentai: 6,
      Ecchi: 7,
      "Ecchi (érotique)": 7
    };

    // Obtenir le genre formaté
    const formattedGenre =
      cleanedGenre.charAt(0).toUpperCase() + cleanedGenre.slice(1);
    console.log(formattedGenre);
    // Obtenir la catégorie à partir du mapping
    const category_id = genreToCategoryMapping[formattedGenre];
    console.log("catégorie de manga :" + category_id);
    
    // On va finalement autoriser le cas ou il n'y a pas de catégorie
    // if (category_id === undefined) {           
    //   throw new Error("Genre non pris en charge");
    // }

    // Vérifier si la catégorie est autorisée
    if (category_id === 6 || category_id === 7) {
      throw new Error(
        "Cette catégorie de manga n'est pas autorisée sur le site petit coquin"
      );
    }

    // Retourner un objet contenant toutes les informations du livre
    return {
      code_isbn: parseInt(isbn),
      title: titleWithoutVolume,
      volume: volumeNumber,
      year_publication: parseInt(year),
      author: mainAuthor,
      description,
      cover_url: localImageUrl,
      category_id
    };
  }

  // Exemple d'utilisation de la fonction pour extraire les informations du livre
  const extractedBookInfo = await extractBookInfo();
  return extractedBookInfo;
  // Afficher les informations du livre dans la console
  // console.log("Informations du livre :", extractedBookInfo);
}

module.exports = {
  mangaAPI
};
