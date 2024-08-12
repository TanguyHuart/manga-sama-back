const nodemailer = require("nodemailer");

/**
 * Crée un transporteur pour l'envoi d'e-mails en utilisant nodemailer.
 * Ce transporteur est configuré pour utiliser Gmail avec des paramètres SMTP.
 * Les informations d'authentification (adresse e-mail et mot de passe) sont
 * récupérées à partir des variables d'environnement.
 *
 * @module transporter
 */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT_ADDRESS, // Adresse e-mail de l'expéditeur
    pass: process.env.MAIL_ACCOUNT_PASSWORD // Mot de passe de l'expéditeur
  }
});

module.exports = transporter;
