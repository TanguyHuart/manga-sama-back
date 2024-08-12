// Importe le module crypto de Node.js pour les opérations cryptographiques
const crypto = require("crypto");

// Déclare une fonction pour générer un secret JWT aléatoire
const generateRandomSecret = () => {
  // Utilise crypto.randomBytes pour générer 32 octets de données aléatoires,
  // puis convertit ces octets en une chaîne hexadécimale pour être utilisée comme secret
  return crypto.randomBytes(32).toString("hex");
};

// Exporte un objet contenant la clé secrète JWT. Utilise la variable d'environnement
// process.env.JWT_SECRET si elle est définie, sinon génère un secret aléatoire avec la fonction précédemment déclarée.
module.exports = {
  jwtSecretKey: process.env.JWT_SECRET || generateRandomSecret()
};
