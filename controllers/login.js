const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
//const collection = require("../config"); 
const router = express.Router();
const user_model = require(('../models/user')); 


const SECRET_KEY = process.env.SECRET_KEY;


async function pagina_login (req, res) {
    //res.json({ mensaje: "Bienvenido a la pagina BD Mongoose" });
    //const { username, password } = req.body;
    const { email, password } = req.body;
    const email1 = req.body.email;
    
    

    try {
        console.log("email: "+req.body.email+"  password: "+req.body.password)
        //const { email, password } = req.body;
        console.log(email,password)
        const check = await user_model.findOne({ email: req.body.email });
        if (!check) {
            return res.status(404).send("No se encuentra el correo registrado");
        }

        if (req.body.password === check.password) {
            // Generar el token JWT
            const token = jwt.sign({ id: email1 }, SECRET_KEY, {
                expiresIn: 86400, // 24 horas
            });

            // Adjuntar el token en la respuesta
            //res.cookie('token', token, { httpOnly: true });
            res.json({result: token})
            //return res.status(200).send({ message: 'Login successful' });
            //res.json({result: token})
        } else {
            return res.status(401).send({ message: 'Password Incorrecto' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error en el servidor' });
    }
}

module.exports = { pagina_login};
