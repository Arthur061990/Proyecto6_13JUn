const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt')
const collection = require("./config");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


 
// Load environment variables
dotenv.config()
 
// SERVER initialization
const app = express()

//Secret Key para WEb Token
const SECRET_KEY = 'your_secret_key';

//Definicion de ruta para home (pagina principal)
const homeRouter = require('./routes/home');
//Definicion de ruta para login
const loginRouter = require('./routes/login');
//Definicion de ruta para registro de usuario
const signupRouter = require('./routes/signup');
//Definicion de ruta protegida que devuelve datos de usuario
const datosUsuario = require('./routes/protected/datos');




 
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Usa la ruta home
app.use('/', homeRouter);
// Usa la ruta de login
app.use('/', loginRouter);
// Usa la ruta de registro
app.use('/', signupRouter);
// Usa la ruta protegida de datos de usuario
app.use('/protected', datosUsuario);



 
// SERVER LISTENING
app.listen( process.env.PORT , () => {
    console.log('Server is running on port ', process.env.PORT)
})