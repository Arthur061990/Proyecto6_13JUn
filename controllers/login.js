const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
//const collection = require("../config"); 
const router = express.Router();
const user_model = require(('../models/user')); 


const SECRET_KEY = 'token';



// Ruta para manejar el envío del formulario de login
/*
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
});*/

async function pagina_login (req, res) {
    //res.json({ mensaje: "Bienvenido a la pagina BD Mongoose" });
    //const { username, password } = req.body;
    const { email, password } = req.body;

    // Lógica para manejar el inicio de sesión
    console.log(`Email: ${email}, Password: ${password}`);

    try {
        console.log("email: "+req.body.email+"  password: "+req.body.password)
        const { email, password } = req.body;
        console.log(email,password)
        const check = await user_model.findOne({ email: req.body.username });
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
            return res.status(401).send({ message: 'Password Incorrecto' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor' });
    }
}

module.exports = { pagina_login};
