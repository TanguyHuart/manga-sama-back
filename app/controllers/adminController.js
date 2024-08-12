const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const adminController = {
  getAdminData: (request, response) => {
    // Utiliser le middleware d'authentification pour vérifier le token JWT
    authenticationMiddleware(request, response, () => {
      // Vérifier si l'utilisateur a le rôle d'administrateur
      if (request.user?.role_id === 2) {
        // Envoyer les données nécessaires pour la page d'administration
        return response.status(200).json({
          success: true,
          message: "Accès autorisé à la page d'administration"
        });
      }
      // Si l'utilisateur n'est pas authentifié en tant qu'administrateur, renvoyer une réponse d'erreur
      return response.status(403).json({
        success: false,
        message: "Accès interdit. Vous n'êtes pas administrateur."
      });
    });
  }
};

module.exports = adminController;
