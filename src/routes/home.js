const express = require('express');
const path = require('path');
const router = express.Router();

// Ruta para servir la página de inicio (home)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

module.exports = router;