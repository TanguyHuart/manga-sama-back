// Importation des modules nécessaires
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Fonction pour définir la destination dynamique
const dynamicDestination = (subfolder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      // Détermine le dossier de destination en fonction du sous-dossier spécifié
      cb(null, path.join(__dirname, `../../public/uploads/${subfolder}`));
    },
    filename: function (req, file, cb) {
      // Utilise crypto.randomBytes pour générer un nom de fichier aléatoire
      crypto.randomBytes(8, (err, buf) => {
        if (err) return cb(err);

        // Ajoute l'extension au nom généré aléatoirement
        const filename = buf.toString("hex") + path.extname(file.originalname);

        cb(null, filename);
      });
    }
  });
};

// Middleware Multer pour les images d'utilisateurs
const uploadUser = multer({
  storage: dynamicDestination("user"), // Utilise la fonction dynamicDestination avec le sous-dossier "user"
  fileFilter: function (req, file, cb) {
    // Filtre les types de fichiers autorisés
    const allowedMimes = ["image/jpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non pris en charge"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite la taille du fichier à 5 Mo
  }
}).single("image"); // Accepte un seul fichier avec le champ "image"

// Middleware Multer pour les images d'articles
const uploadArticle = multer({
  storage: dynamicDestination("article"), // Utilise la fonction dynamicDestination avec le sous-dossier "article"
  fileFilter: function (req, file, cb) {
    // Filtre les types de fichiers autorisés
    const allowedMimes = ["image/jpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non pris en charge"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite la taille du fichier à 5 Mo
  }
}).single("image"); // Accepte un seul fichier avec le champ "image"

// Exporte les middlewares configurés pour les images d'utilisateurs et d'articles
module.exports = { uploadUser, uploadArticle };
