const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    createMessage: async (message) => {
        const { title, text, user_id } = message;
        const res = await pool.query(
            `INSERT INTO messages (title, text, user_id) 
             VALUES ($1, $2, $3) RETURNING *`,
            [title, text, user_id]
        );
        return res.rows[0];
    },
    getAllMessages: async () => {
        const res = await pool.query('SELECT * FROM messages');
        return res.rows;
    },
    deleteMessage: async (messageId) => {
        await pool.query('DELETE FROM messages WHERE id = $1', [messageId]);
    }
};