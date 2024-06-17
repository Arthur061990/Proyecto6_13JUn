const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const collection = require("../config"); 
const router = express.Router();


const SECRET_KEY = 'your_secret_key';

// Ruta para servir la página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Ruta para manejar el envío del formulario de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const check = await collection.findOne({ email: req.body.username });
        if (!check) {
            return res.status(404).send("No se encuentra el correo registrado");
        }

        if (req.body.password === check.password) {
            // Generar el token JWT
            const token = jwt.sign({ id: req.body.username }, SECRET_KEY, {
                expiresIn: 86400, // 24 horas
            });

            // Adjuntar el token en la respuesta
            res.cookie('token', token, { httpOnly: true });

            // Enviar la respuesta con una indicación de éxito
            return res.status(200).send({ message: 'Login successful' });
        } else {
            return res.status(401).send("Password incorrecto");
        }
    } catch (error) {
        return res.status(500).send("Error en el servidor");
    }
});

module.exports = router;
