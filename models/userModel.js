const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
    createUser: async (user) => {
        const { first_name, last_name, username, password, is_admin = false } = user;
        const res = await pool.query(
            `INSERT INTO users (first_name, last_name, username, password, is_admin) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, username, password, is_admin]
        );
        return res.rows[0];
    },
    
    findUserByUsername: async (username) => {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows[0];
    },
    
    updateMembershipStatus: async (userId, status) => {
        await pool.query('UPDATE users SET membership_status = $1 WHERE id = $2', [status, userId]);
    },
    
    makeAdmin: async (userId) => {
        await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [userId]);
    }
};
