// Importation du module sanitizer
const sanitizer = require("sanitizer");

// Fonction pour nettoyer les données de la requête
function cleanRequestData(data) {
  // Vérifier si les données existent
  if (data) {
    try {
      // Parcourir toutes les clés de l'objet au lieu d'un for in qui irait aussi parcours les objets hérités du prototype
      Object.keys(data).forEach((propName) => {
        // Appliquer la fonction escape de sanitizer pour nettoyer la valeur de la propriété
        data[propName] = sanitizer.escape(data[propName]);
      });
    } catch (error) {
      // Gérer les erreurs lors du nettoyage des données
      console.error("Erreur lors du nettoyage des données :", error);
    }
  }
}

// Middleware pour le nettoyage des données de la requête
const bodySanitizer = (request, response, next) => {
  // Appeler la fonction cleanRequestData pour nettoyer request.body
  cleanRequestData(request.body);
  // Appeler la fonction cleanRequestData pour nettoyer request.params
  cleanRequestData(request.params);
  // Passer à la middleware suivante
  next();
};

// Exporter le middleware bodySanitizer
module.exports = bodySanitizer;
