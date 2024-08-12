/* eslint-disable no-useless-escape */
const transporter = require("./nodemailer");
const fs = require("fs");

// Fonction asynchrone pour envoyer des e-mails avec journalisation
async function sendMailWithLogging(mailOptions, successMessage) {
  try {
    await transporter.sendMail(mailOptions);
    console.log(successMessage);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'e-mail :`, error);
    throw error;
  }
}

const emailService = {
  // Envoi d'un e-mail de confirmation d'inscription
  sendConfirmationEmail: async (toEmail) => {
    // Chemin vers le fichier HTML du mail d'inscription
    const htmlRegisterFilePath =
      "app/services/mail/templates/register/index.html";
    const imageRegisterFolderPath =
      "app/services/mail/templates/register/images/";

    // Lire le contenu du fichier HTML
    const htmlRegisterContent = fs.readFileSync(htmlRegisterFilePath, "utf-8");

    const mailOptions = {
      from: "contact.manga.sama@gmail.com",
      to: toEmail,
      subject: "(づ｡◕‿‿◕｡)づ Manga-Sama Confirmation d'inscription 🍣",
      html: htmlRegisterContent,
      // Je lie en pièce jointe les images qui sont dans le code HTML
      attachments: [
        {
          filename: "image-12.png",
          path: imageRegisterFolderPath + "image-12.png",
          cid: "image-12.png"
        },
        {
          filename: "image-11.jpeg",
          path: imageRegisterFolderPath + "image-11.jpeg",
          cid: "image-11.jpeg"
        },
        {
          filename: "image-8.jpeg",
          path: imageRegisterFolderPath + "image-8.jpeg",
          cid: "image-8.jpeg"
        },
        {
          filename: "image-7.jpeg",
          path: imageRegisterFolderPath + "image-7.jpeg",
          cid: "image-7.jpeg"
        },
        {
          filename: "image-12.png",
          path: imageRegisterFolderPath + "image-12.png",
          cid: "image-12.png"
        },
        {
          filename: "image-9.jpeg",
          path: imageRegisterFolderPath + "image-9.jpeg",
          cid: "image-9.jpeg"
        },
        {
          filename: "image-10.gif",
          path: imageRegisterFolderPath + "image-10.gif",
          cid: "image-10.gif"
        },
        {
          filename: "image-2.png",
          path: imageRegisterFolderPath + "image-2.png",
          cid: "image-2.png"
        },
        {
          filename: "image-1.png",
          path: imageRegisterFolderPath + "image-1.png",
          cid: "image-1.png"
        },
        {
          filename: "image-3.png",
          path: imageRegisterFolderPath + "image-3.png",
          cid: "image-3.png"
        },
        {
          filename: "image-4.png",
          path: imageRegisterFolderPath + "image-4.png",
          cid: "image-4.png"
        },
        {
          filename: "image-5.png",
          path: imageRegisterFolderPath + "image-5.png",
          cid: "image-5.png"
        },
        {
          filename: "image-4.png",
          path: imageRegisterFolderPath + "image-4.png",
          cid: "image-4.png"
        },
        {
          filename: "image-6.png",
          path: imageRegisterFolderPath + "image-6.png",
          cid: "image-6.png"
        }
      ]
    };
    return sendMailWithLogging(
      mailOptions,
      "E-mail de confirmation envoyé avec succès."
    );
  },

  // Envoi d'un e-mail de confirmation d'achat pour l'acheteur
  sendTransactionBuyerConfirmationEmail: async (
    buyerEmail,
    sellerEmail,
    articleInfos
  ) => {
    // Chemin vers le fichier HTML du mail d'achat
    const htmlBuyFilePath = "app/services/mail/templates/confirmBuy/index.html";
    const imageBuyFolderPath = "app/services/mail/templates/confirmBuy/images/";
    let htmlBuyContent = fs.readFileSync(htmlBuyFilePath, "utf-8");

    // Mise à jour de la variable htmlBuyContent avec les remplacements
    htmlBuyContent = htmlBuyContent
      .replace("{{SELLER_EMAIL}}", sellerEmail)
      .replace("{{MANGA_TITLE}}", articleInfos.title);

    // Définition des options de l'e-mail (expéditeur, destinataire, sujet, contenu)
    const mailOptions = {
      from: "contact.manga.sama@gmail.com",
      to: buyerEmail,
      subject: `Le manga "${articleInfos.title}" a été réservé!📚`,
      html: htmlBuyContent,
      // Je lie en pièce jointe les images qui sont dans le code HTML
      attachments: [
        {
          filename: "image-1.png",
          path: imageBuyFolderPath + "image-1.png",
          cid: "image-1.png"
        },
        {
          filename: "image-2.png",
          path: imageBuyFolderPath + "image-2.png",
          cid: "image-2.png"
        },
        {
          filename: "image-3.png",
          path: imageBuyFolderPath + "image-3.png",
          cid: "image-3.png"
        },
        {
          filename: "image-4.png",
          path: imageBuyFolderPath + "image-4.png",
          cid: "image-4.png"
        },
        {
          filename: "image-5.png",
          path: imageBuyFolderPath + "image-5.png",
          cid: "image-5.png"
        }
      ]
    };
    return sendMailWithLogging(
      mailOptions,
      "E-mail de confirmation d'achat envoyé avec succès."
    );
  },

  // Envoi d'un e-mail de confirmation de vente pour le vendeur
  sendTransactionSellerConfirmationEmail: async (
    buyerEmail,
    sellerEmail,
    articleInfos
  ) => {
    // Chemin vers le fichier HTML du mail de confirmation pour le vendeur
    const htmlSellerConfirmationFilePath =
      "app/services/mail/templates/confirmSell/index.html";
    const imageSellerConfirmationFolderPath =
      "app/services/mail/templates/confirmSell/images/";
    // Lire le contenu du fichier HTML pour le mail de confirmation du vendeur
    const htmlSellerConfirmationContent = fs.readFileSync(
      htmlSellerConfirmationFilePath,
      "utf-8"
    );

    // Mise à jour de la variable htmlSellerConfirmationContent avec les remplacements
    const sellerConfirmationMailContent = htmlSellerConfirmationContent
      .replace("{{BUYER_EMAIL}}", buyerEmail)
      .replace("{{MANGA_TITLE}}", articleInfos.title);

    const mailOptions = {
      from: "contact.manga.sama@gmail.com",
      to: sellerEmail,
      subject: `Ton manga "${articleInfos.title}" a été acheté!📚`,
      html: sellerConfirmationMailContent,
      // Je lie en pièce jointe les images qui sont dans le code HTML
      attachments: [
        {
          filename: "image-1.png",
          path: imageSellerConfirmationFolderPath + "image-1.png",
          cid: "image-1.png"
        },
        {
          filename: "image-2.png",
          path: imageSellerConfirmationFolderPath + "image-2.png",
          cid: "image-2.png"
        },
        {
          filename: "image-3.png",
          path: imageSellerConfirmationFolderPath + "image-3.png",
          cid: "image-3.png"
        },
        {
          filename: "image-4.png",
          path: imageSellerConfirmationFolderPath + "image-4.png",
          cid: "image-4.png"
        },
        {
          filename: "image-5.png",
          path: imageSellerConfirmationFolderPath + "image-5.png",
          cid: "image-5.png"
        }
      ]
    };

    // Appel de la fonction sendMailWithLogging avec les options de courriel
    return sendMailWithLogging(
      mailOptions,
      "E-mail de confirmation de vente envoyé avec succès."
    );
  }
};

module.exports = emailService;
