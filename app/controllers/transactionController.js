const transactionDataMapper = require("../dataMappers/transactionDataMapper");
const { v4: uuidv4 } = require("uuid");
const emailService = require("../services/mail/emailService.js");
const userDataMapper = require("../dataMappers/userDataMapper");

const transactionController = {
  addTransaction: async (request, response) => {
    try {
      const { userId } = request.user;
      const { sellerId, articleId } = request.body;
      // Vérifie la présence de tous les paramètres nécessaires dans le corps de la requête
      if (!sellerId || !articleId || !userId) {
        return response.status(400).json({
          error: "Paramètre manquant dans le corps de la requête"
        });
      }
      console.log("userId : " + userId);
      console.log("sellerId : " + sellerId);
      console.log("articleIDd: " + articleId);
      console.log("Type de userId : " + typeof userId);
      console.log("Type de sellerID : " + typeof sellerId);
      
      if (userId == sellerId) { // le userId est un number et le sellerID une string on fait donc uen égalité non stricte
        return response.status(403).json({
          message: "Souhaites-tu vraiment t'acheter toi même ton article? o_o"
        });
      }
      const buyerEmail = await userDataMapper.findOneUserEmailById(userId);
      const sellerEmail = await userDataMapper.findOneUserEmailById(sellerId);

      const transaction_id = uuidv4();
      const date_transaction = new Date();
      const state_completion = "Achat en cours";

      const newTransaction =
        await transactionDataMapper.updateTransactionDetails(
          articleId,
          transaction_id,
          date_transaction,
          state_completion
        );

      if (newTransaction) {
        try {
          // Envoi d'un e-mail de confirmation ✉
          await emailService.sendTransactionBuyerConfirmationEmail(
            buyerEmail,
            sellerEmail,
            newTransaction
          );
          await emailService.sendTransactionSellerConfirmationEmail(
            buyerEmail,
            sellerEmail,
            newTransaction
          );
        } catch (error) {
          console.error(error);
          response.status(500).json({
            message: "Erreur lors de l'envoi de l'e-mail de confirmation."
          });
        }
        // La transaction s'est bien déroulée
        console.log("La transaction s'est bien déroulée");
        return response.json({
          status: 200,
          success: true,
          message: "transaction effectuée avec succès",
          transaction: newTransaction
        });
      } else {
        // Aucune ligne affectée, la création n'a pas été effectuée
        return response.json({
          status: 200,
          success: false,
          message: "La transaction n'a pas pu s'effectuer"
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
  }
  // TODO! : Faire la mise à jour de l'état d'une transaction vers terminé
};

module.exports = transactionController;
