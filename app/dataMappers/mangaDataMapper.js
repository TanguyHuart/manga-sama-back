const {pool} = require('../config/database');

const mangaDataMapper = {

  // Récupère tous les mangas de la base de données
  findAllMangas: async () => {
    const sql = "SELECT * FROM manga ORDER BY title ASC;";
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga trouvé dans la base de données");
    }
    return result.rows;
  },
  
  // Insère un nouveau manga dans la base de données
  insertOneManga: async ({
    code_isbn,
    title,
    volume,
    year_publication,
    author,
    description,
    cover_url,
    category_id}) => 
  {
    const sql = {
      text : "INSERT INTO manga (code_isbn, title, volume, year_publication, author, description, cover_url, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      values : [
        code_isbn,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucun manga trouvé dans la base de données");
    }
    return result.rows[0];
  },

  // Met à jour les informations d'un manga dans la base de données
  updateOneManga: async ({
    code_isbn,
    title,
    volume,
    year_publication,
    author,
    description,
    cover_url,
    category_id
  }) => {
    const sql = {
      text: `
      UPDATE manga
      SET
        title = $2,
        volume = $3,
        year_publication = $4,
        author = $5,
        description = $6,
        cover_url = $7,
        category_id = $8
      WHERE
        code_isbn = $1
      RETURNING *;
    `,
      values: [
        code_isbn,
        title,
        volume,
        year_publication,
        author,
        description,
        cover_url,
        category_id
      ]
    };

    const result = await pool.query(sql);

    if (!result.rowCount) {
      throw new Error("Aucun manga trouvé pour la mise à jour dans la base de données");
    }

    return result.rows[0];
  },


  // Récupère un manga par son code isbn
  findOneMangaById: async (code_isbn) => {
    const sql = {
      text: "SELECT * FROM manga WHERE code_isbn = $1;",
      values: [code_isbn]
    };
    const result = await pool.query(sql);
  
    // if (!result.rowCount) {
    //   // throw new Error("Aucun manga correspondant dans la base de données");
    // }
    return result.rows[0];
  },

  // Supprime un manga par son code isbn
  deleteOneMangaById: async (code_isbn) => {
    const sql = {
      text: "DELETE FROM manga WHERE code_isbn = $1;",
      values: [code_isbn]
    };
    const result = await pool.query(sql);
    if (result.rowCount === 1) {
      return { success: true };
    } else {
      console.log(result);
      console.log("Aucun manga correspondant dans la base de données");

    }
  }
};
module.exports = mangaDataMapper;