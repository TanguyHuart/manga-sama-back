// Import d'express et du router
const express = require("express");
const router = express.Router();

// Import des sous routeurs
const articlesRouter = require("./articles");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");
const mangasRouter = require("./mangas");
const conditionsRouter = require("./conditions");
const rolesRouter = require("./roles");
const imagesRouter = require("./images");
const authenticationRouter = require("./authentication.js");
// Import du routeur des associations
const associationsRouter = require("./associations");

// Import du routeur d'administration
const adminRouter = require("./admin");

// Import du routeur des transactions
const transctionRouter = require("./transactions");

// Routes correspondant aux annonces
router.use("/article", articlesRouter);

// Routes correspondant aux catégories
router.use("/category", categoriesRouter);

// Routes correspondant aux utilisateurs
router.use("/user", usersRouter);

//  Routes correspondant aux mangas dans la base de données
router.use("/manga", mangasRouter);

// Routes correspondant à l'état des mangas
router.use("/condition", conditionsRouter);

// Routes correspondant aux rôles utilisateur
router.use("/role", rolesRouter);

// Routes correspondant aux des couvertures de mangas
router.use("/images", imagesRouter);

// Routes correspondnant à la gestion de l'authentification et de la déconnexion
router.use("/auth", authenticationRouter);

// Routes correspondant aux associations
router.use("/associate", associationsRouter);

// Routes d'administration
router.use("/admin", adminRouter);

// Routes correspondant aux transactions
router.use("/transaction", transctionRouter);
// Route par défaut
router.get("/", (request, response) => {
  // Réponse avec l'ASCII art
  const asciiArt = `

  ██████╗░██╗███████╗███╗░░██╗██╗░░░██╗███████╗███╗░░██╗██╗░░░██╗███████╗  ░██████╗██╗░░░██╗██████╗░
  ██╔══██╗██║██╔════╝████╗░██║██║░░░██║██╔════╝████╗░██║██║░░░██║██╔════╝  ██╔════╝██║░░░██║██╔══██╗
  ██████╦╝██║█████╗░░██╔██╗██║╚██╗░██╔╝█████╗░░██╔██╗██║██║░░░██║█████╗░░  ╚█████╗░██║░░░██║██████╔╝
  ██╔══██╗██║██╔══╝░░██║╚████║░╚████╔╝░██╔══╝░░██║╚████║██║░░░██║██╔══╝░░  ░╚═══██╗██║░░░██║██╔══██╗
  ██████╦╝██║███████╗██║░╚███║░░╚██╔╝░░███████╗██║░╚███║╚██████╔╝███████╗  ██████╔╝╚██████╔╝██║░░██║
  ╚═════╝░╚═╝╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░╚═════╝░╚══════╝  ╚═════╝░░╚═════╝░╚═╝░░╚═╝
  
  ██╗░░░░░███████╗  
  ██║░░░░░██╔════╝  
  ██║░░░░░█████╗░░  
  ██║░░░░░██╔══╝░░  
  ███████╗███████╗  
  ╚══════╝╚══════╝  
  
  ██████╗░░█████╗░░█████╗░██╗░░██╗███████╗███╗░░██╗██████╗░  ██████╗░███████╗
  ██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔════╝████╗░██║██╔══██╗  ██╔══██╗██╔════╝
  ██████╦╝███████║██║░░╚═╝█████═╝░█████╗░░██╔██╗██║██║░░██║  ██║░░██║█████╗░░
  ██╔══██╗██╔══██║██║░░██╗██╔═██╗░██╔══╝░░██║╚████║██║░░██║  ██║░░██║██╔══╝░░
  ██████╦╝██║░░██║╚█████╔╝██║░╚██╗███████╗██║░╚███║██████╔╝  ██████╔╝███████╗
  ╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚══╝╚═════╝░  ╚═════╝░╚══════╝
  
  ███╗░░░███╗░█████╗░███╗░░██╗░██████╗░░█████╗░░░░░░░░██████╗░█████╗░███╗░░░███╗░█████╗░
  ████╗░████║██╔══██╗████╗░██║██╔════╝░██╔══██╗░░░░░░██╔════╝██╔══██╗████╗░████║██╔══██╗
  ██╔████╔██║███████║██╔██╗██║██║░░██╗░███████║█████╗╚█████╗░███████║██╔████╔██║███████║
  ██║╚██╔╝██║██╔══██║██║╚████║██║░░╚██╗██╔══██║╚════╝░╚═══██╗██╔══██║██║╚██╔╝██║██╔══██║
  ██║░╚═╝░██║██║░░██║██║░╚███║╚██████╔╝██║░░██║░░░░░░██████╔╝██║░░██║██║░╚═╝░██║██║░░██║
  ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝░╚═════╝░╚═╝░░╚═╝░░░░░░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝
  
  
  ██╗░░░██╗░█████╗░██╗░░░██╗░██████╗  ███╗░░██╗██╗░█████╗░██╗░░░██╗███████╗███████╗
  ██║░░░██║██╔══██╗██║░░░██║██╔════╝  ████╗░██║╚█║██╔══██╗██║░░░██║██╔════╝╚════██║
  ╚██╗░██╔╝██║░░██║██║░░░██║╚█████╗░  ██╔██╗██║░╚╝███████║╚██╗░██╔╝█████╗░░░░███╔═╝
  ░╚████╔╝░██║░░██║██║░░░██║░╚═══██╗  ██║╚████║░░░██╔══██║░╚████╔╝░██╔══╝░░██╔══╝░░
  ░░╚██╔╝░░╚█████╔╝╚██████╔╝██████╔╝  ██║░╚███║░░░██║░░██║░░╚██╔╝░░███████╗███████╗
  ░░░╚═╝░░░░╚════╝░░╚═════╝░╚═════╝░  ╚═╝░░╚══╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚══════╝
  
  ██████╗░██╗███████╗███╗░░██╗
  ██╔══██╗██║██╔════╝████╗░██║
  ██████╔╝██║█████╗░░██╔██╗██║
  ██╔══██╗██║██╔══╝░░██║╚████║
  ██║░░██║██║███████╗██║░╚███║
  ╚═╝░░╚═╝╚═╝╚══════╝╚═╝░░╚══╝
  
  ░█████╗░  ███████╗░█████╗░██╗██████╗░███████╗  ██╗░█████╗░██╗░░░
  ██╔══██╗  ██╔════╝██╔══██╗██║██╔══██╗██╔════╝  ██║██╔══██╗██║░░░
  ███████║  █████╗░░███████║██║██████╔╝█████╗░░  ██║██║░░╚═╝██║░░░
  ██╔══██║  ██╔══╝░░██╔══██║██║██╔══██╗██╔══╝░░  ██║██║░░██╗██║██╗
  ██║░░██║  ██║░░░░░██║░░██║██║██║░░██║███████╗  ██║╚█████╔╝██║╚█║
  ╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝╚═╝╚═╝░░╚═╝╚══════╝  ╚═╝░╚════╝░╚═╝░╚╝
  
  ░█████╗░██╗░░░░░░█████╗░██████╗░░██████╗  ░█████╗░██╗░░░██╗░██████╗████████╗██╗
  ██╔══██╗██║░░░░░██╔══██╗██╔══██╗██╔════╝  ██╔══██╗██║░░░██║██╔════╝╚══██╔══╝██║
  ███████║██║░░░░░██║░░██║██████╔╝╚█████╗░  ██║░░██║██║░░░██║╚█████╗░░░░██║░░░██║
  ██╔══██║██║░░░░░██║░░██║██╔══██╗░╚═══██╗  ██║░░██║██║░░░██║░╚═══██╗░░░██║░░░╚═╝
  ██║░░██║███████╗╚█████╔╝██║░░██║██████╔╝  ╚█████╔╝╚██████╔╝██████╔╝░░░██║░░░██╗
  ╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝╚═════╝░  ░╚════╝░░╚═════╝░╚═════╝░░░░╚═╝░░░╚═╝                                                                                                                                                                                                  `;
  // Styles and Font link
  const styles = `
    <style>
      .text-art {
        background-color: hsla(0, 0%, 50%, 0.15);
        font-family: 'Big Money-nw', monospace;
        font-size: 1rem;
        line-height: 1;
        overflow: auto;
        padding: 1rem;
        white-space: pre;
      }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/figlet@1.4.0/fonts/Big%20Money-nw.flf">
  `;

  // Sending the response
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${styles}
      </head>
      <body>
        <div class="text-art">${asciiArt}</div>
      </body>
    </html>
  `);
});
module.exports = router;

// TODO! : protéger les routes avec un middleware qui check l'authorization
