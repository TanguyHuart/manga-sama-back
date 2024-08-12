const {pool} = require('../config/database');

const categoryDataMapper = {

  // Récupère toutes les catégories de la base de données
  findAllCategories: async () => {
    const sql = "SELECT * FROM category ORDER BY id ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun category trouvé dans la base de données");
    }
    return result.rows;
  },
  
  // Insère une nouvelle catégorie dans la base de données
  insertOneCategory: async ({
    category_name
  }) => 
  {
    const sql = {
      text : "INSERT INTO category (category_name) VALUES ($1) RETURNING *;",
      values : [
        category_name]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune categorie trouvée dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un catégorie dans la base de données
  updateOneCategory: async ({
    id,
    category_name
  }) => {
    const sql = {
      text: `
      UPDATE category
      SET
      category_name = $2
      WHERE id = $1
      RETURNING *;
    `,
      values: [
        id,
        category_name]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucun categorie trouvée pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },

  // Récupère un categorie par son id
  findOneCategoryById: async (id) => {
    const sql = {
      text: "SELECT * FROM category WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun categorie correspondante dans la base de données");
    }
    return result.rows[0];
  },

  // Supprime un categorie par son code id
  deleteOneCategoryById: async (id) => {
    const sql = {
      text: "DELETE FROM category WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return { success: true };
    } else {
      console.log(result);
      console.log("Aucun categorie correspondante dans la base de données");

    }
  }
};
module.exports = categoryDataMapper;