const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt')
//const { conectar, UsuariosRegistrados } = require('./config');
const collection = require("./config");

 
// Load environment variables
dotenv.config()
 
// SERVER initialization
const app = express()
 
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Ruta para servir la página de inicio (home)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Ruta para servir la página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Ruta para manejar el envío del formulario de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí podrías agregar lógica para manejar el inicio de sesión
    res.send(`Usuario: ${username}, Contraseña: ${password}`);
});


// Ruta para servir la página de registro
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});


//Ruta para registrar un usuario
app.post('/signup', async(req,res) =>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})


 
// SERVER LISTENING
app.listen( process.env.PORT , () => {
    console.log('Server is running on port ', process.env.PORT)
})