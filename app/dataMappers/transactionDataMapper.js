const { pool } = require("../config/database");

const transactionDataMapper = {
  // Insère une nouvelle catégorie dans la base de données

  updateTransactionDetails: async (
    article_id,
    transaction_id,
    date_transaction,
    state_completion
  ) => {
    const sql = {
      text: "UPDATE article SET transaction_id =$2, date_transaction =$3, state_completion =$4 WHERE id = $1 RETURNING *;",
      values: [article_id, transaction_id, date_transaction, state_completion]
    };
    const result = await pool.query(sql);
    if (!result.rowCount) {
      throw new Error("Aucune Annonce trouvée dans la base de données");
    }
    return result.rows[0];
  }

  // TODO! : Faire la mise à jour de l'état d'une transaction vers terminé
};

module.exports = transactionDataMapper;
