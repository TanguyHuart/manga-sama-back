const {
  pool
} = require('../config/database');

const roleDataMapper = {

  // Récupère tous les Roles de la base de données
  findAllRoles: async () => {
    const sql = "SELECT * FROM role ORDER BY id ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Roles trouvés dans la base de données");
    }
    return result.rows;
  },

  // Insère un nouveau Role dans la base de données
  insertOneRole: async ({
    role_name
  }) => {
    const sql = {
      text: "INSERT INTO role ( role_name) VALUES ($1) RETURNING *;",
      values: [
        role_name
      ]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Role trouvé dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un Role dans la base de données
  updateOneRole: async ({
    id,
    role_name
  }) => {
    const sql = {
      text: `
    UPDATE 
    role SET  
    role_name = $2 
    WHERE id = $1
    RETURNING *;`,
      values: [
        id,
        role_name
      ]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucun Role trouvé pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },

  // Récupère une Role par son id
  findOneRoleById: async (id) => {
    const sql = {
      text: "SELECT * FROM role WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun Role correspondant dans la base de données");
    }
    return result.rows[0];
  },

  // Supprime une Role par son id
  deleteOneRoleById: async (id) => {
    const sql = {
      text: "DELETE FROM role WHERE id = $1;",
      values: [id]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return {
        success: true
      };
    } else {
      console.log(result);
      console.log("Aucun Role correspondant dans la base de données");

    }
  }
};
module.exports = roleDataMapper;