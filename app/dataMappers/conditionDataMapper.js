const {
  pool
} = require('../config/database');

const conditionDataMapper = {

  // Récupère toutes les états de la base de données
  findAllConditions: async () => {
    const sql = "SELECT * FROM condition ORDER BY id ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun états trouvés dans la base de données");
    }
    return result.rows;
  },

  // Insère un nouvel état dans la base de données
  insertOneCondition: async ({
    condition_name
  }) => {
    const sql = {
      text: "INSERT INTO condition (condition_name) VALUES ($1) RETURNING *;",
      values: [
        condition_name
      ]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun état trouvé dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un état dans la base de données
  updateOneCondition: async ({
    id,
    condition_name
  }) => {
    const sql = {
      text: `
    UPDATE 
    condition SET  
    condition_name = $2 
    WHERE id = $1
    RETURNING *;`,
      values: [
        id,
        condition_name
      ]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucun état trouvé pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },

  // Récupère un état par son id
  findOneConditionById: async (id) => {
    const sql = {
      text: "SELECT * FROM condition WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun état correspondant dans la base de données");
    }
    return result.rows[0];
  },

  // Supprime un état par son id
  deleteOneConditionById: async (id) => {
    const sql = {
      text: "DELETE FROM condition WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return {
        success: true
      };
    } else {
      console.log(result);
      console.log("Aucun état correspondant dans la base de données");

    }
  }
};
module.exports = conditionDataMapper;
