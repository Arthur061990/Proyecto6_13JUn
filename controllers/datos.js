const express = require('express');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Ruta protegida de ejemplo
router.get('/', verifyToken, (req, res) => {
    res.status(200).send('Ruta Protegida para el usuario: ' + req.userId);
});

module.exports = router;
