const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const articleDataMapper = require("../dataMappers/articleDataMapper");
const userDataMapper = require("../dataMappers/userDataMapper");

// Tableau pour stocker les tokens invalides (expirés)
const tokensBlacklist = [];

// Middleware d'authentification
const authenticateMiddleware = (request, response, next) => {
  // Récupérer le token JWT depuis le header Authorization
  const token = request.header("Authorization");
  console.log("le token récupéré dans le middleware " + token);

  // Vérifier si le token est présent
  if (!token) {
    console.log("le token est manquant");
    return response
      .status(401)
      .json({ status: 401, message: "Accès non autorisé. Token manquant." });
  }

  // Vérifier si le token est dans la liste noire
  if (tokensBlacklist.includes(token)) {
    return response
      .status(401)
      .json({ status: 401, message: "Accès non autorisé. Token expiré." });
  }

  try {
    console.log("Token to decode: ", token);
    console.log("je suis dans le try j'essaye de vérifier ");
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey);
    console.log("le token décodé " + decoded);

    // Ajouter les informations de l'utilisateur au request pour une utilisation ultérieure
    request.user = decoded;
    console.log(request.user);
    // Appeler next() pour passer au middleware suivant ou à la route protégée
    console.log(
      "tout est bon vous pouvez continuer sur le site, vous êtes bien connecté"
    );
    next();
  } catch (error) {
    console.log("j'arrive dans l'erreur");
    console.log(error);
    // En cas d'erreur de vérification du token, ajouter le token à la liste noire
    tokensBlacklist.push(token);
    console.log(tokensBlacklist);
    console.log("Decoding error: ", error);
    return response
      .status(401)
      .json({ status: 401, message: "Accès non autorisé. Token invalide." });
  }
};

// Middleware pour la vérification du propriétaire d'un article
const articleOwnerMiddleware = async (request, response, next) => {
  try {
    console.log(
      "je suis dans le middleware de vérification du propriétaire d'un article"
    );
    const token = request.header("Authorization");
    const articleId = request.params.id;
    const articleOwner = await articleDataMapper.findArticleOwnerByArticleId(
      articleId
    );
    console.log("articleId : " + articleId);
    console.log("articleOwner : " + articleOwner);
    console.log("request.user.userId : " + request.user.userId);

    if (!articleOwner) {
      return response.status(404).json({ message: "Article introuvable." });
    }

    if (request.user.userId !== articleOwner.user_id) {
      tokensBlacklist.push(token);
      return response
        .status(403)
        .json({
          message:
            "Accès refusé. Vous n'êtes pas le propriétaire de cet article."
        });
    }

    console.log("Vérification terminée, je passe à l'étape suivante");
    next();
  } catch (error) {
    response.status(500).json({ message: "Erreur serveur." });
  }
};

// Middleware pour la vérification du propriétaire d'un compte utilisateur
const userOwnerMiddleware = async (request, response, next) => {
  try {
    console.log(
      "je suis dans le middleware de vérification du propriétaire du compte"
    );
    const token = request.header("Authorization");
    console.log("voilà mon token" + token);
    const userId = request.params.id;
    const roleOwner = await userDataMapper.findOneUserById(userId);

    if (!roleOwner) {
      return response.status(404).json({ message: "Utilisateur introuvable." });
    }
    console.log("request.user.userId : " + request.user.userId);
    console.log("roleOwner.id : " + roleOwner.id);

    if (request.user.userId !== roleOwner.id) {
      tokensBlacklist.push(token);
      return response
        .status(403)
        .json({
          message: "Accès refusé. Vous n'êtes pas le propriétaire de ce compte."
        });
    }
    console.log("Vérification terminée, je passe à l'étape suivante");
    next();
  } catch (error) {
    response.status(500).json({ message: "Erreur serveur." });
  }
};

// Middleware pour la limitation de certaines routes au rôle 2 (administrateur)
const roleMiddleware = (request, response, next) => {
  console.log("je suis dans le middleware des rôles");
  const token = request.header("Authorization");
  console.log("voilà mon token" + token);
  if (!request.user || request.user.role !== 2) {
    tokensBlacklist.push(token);
    return response
      .status(403)
      .json({ message: "Accès refusé. Rôle non autorisé." });
  }
  console.log("Vérification terminée, je passe à l'étpae suivante");
  next();
};

module.exports = {
  authenticateMiddleware,
  articleOwnerMiddleware,
  userOwnerMiddleware,
  roleMiddleware
};
