const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt')
//const { conectar, UsuariosRegistrados } = require('./config');
const collection = require("./config");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

 
// Load environment variables
dotenv.config()
 
// SERVER initialization
const app = express()

const SECRET_KEY = 'your_secret_key';

app.use(cookieParser());
 
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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // Aquí podrías agregar lógica para manejar el inicio de sesión
    try{
        const check = await collection.findOne({name: req.body.username})
            if(!check){
                res.send("No se encuentra el usuario registrado")
            }
            console.log(req.body.password+"-"+check.password)
            /*const token = jwt.sign({
                    sub,
                    name,
                    exp: Date.now()+60*1000
                },secret)*/
            if(req.body.password == check.password){
                /*const token = jwt.sign({
                    sub,
                    name,
                    exp: Date.now()+60*1000
                },secret)*/
                // Generar el token JWT
                const token = jwt.sign({ id: req.body.username }, SECRET_KEY, {
                    expiresIn: 86400, // 24 horas
                });
                console.log("Uusuario valido y password valido token:"+token)

                /*res.sendFile(path.join(__dirname, 'views', 'home.html'), (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                });*/

                // Adjuntar el token en la respuesta
                    res.cookie('token', token, { httpOnly: true });

                    // Enviar la respuesta con una indicación de éxito
                    res.status(200).send({ message: 'Login successful' });

            }
            else{
                res.send("Password incorrecto")
            }
        
    }catch{
        res.send("Incorrecto Todo")
    }
    //res.send(`Usuario: ${username}, Contraseña: ${password}`);
});


// Middleware de verificación del token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }
        req.userId = decoded.id;
        next();
    });
};
// Ruta protegida de ejemplo
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).send('This is a protected route');
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