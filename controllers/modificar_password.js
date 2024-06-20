const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
//const collection = require("../config"); 
const router = express.Router();
const user_model = require(('../models/user')); 
const verifyToken = require('../middleware/auth');



async function modificar_password (req, res) {
    const nuevaPassword = req.body.password;
    const userEmail = req.userId; 
    console.log('Usuario:', userEmail); 
    console.log('Data a cambiar:', nuevaPassword); 
    
    if (!userEmail || !nuevaPassword) {
        return res.status(400).send('Faltan datos');
    }

    try {
        const result = await user_model.updateOne({ email: userEmail }, { $set: { password: nuevaPassword } });
        console.log('Actualizado correctamente - ', result); 

        if (result.nModified === 1) {
            res.status(200).send('Contraseña modificada correctamente');
        } else {
            res.status(400).send('No se pudo modificar la contraseña o no se realizaron cambios');
        }
    } catch (error) {
        console.error('Error actualizando la contraseña:', error); // Mensaje de consola para depuración
        res.status(500).send('Error actualizando la contraseña');
    }
}

module.exports = { modificar_password};
