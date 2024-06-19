const express = require('express');
const router = express.Router();

// Ruta para servir la página de inicio (home)
/*router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});*/

function pagina_principal(req, res) {
    res.json({ mensaje: "Bienvenido a la pagina BD Mongoose" });
}

module.exports = { pagina_principal};