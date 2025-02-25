const express = require('express');
const router = express.Router();
const pool = require('../db');


router.post('/:id/delete', async (req, res) => {
    if (!req.user || !req.user.admin) {
        return res.status(403).send('Forbidden');
    }

    const { id } = req.params;
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
    res.redirect('/messages');
});

module.exports = router;
