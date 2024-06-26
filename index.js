const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const path = require('path');
const bcrypt = require('bcrypt')
const collection = require("./models/user");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const cors = require("cors")
//const connect = mongoose.connect(process.env.MONGODB_URL);
// Express Server
const app = express()
//console.log("URL: "+process.env.MONGODB_URL)
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
 
// Variables Entorno
dotenv.config()
const connect = mongoose.connect(process.env.MONGODB_URL);


//Secret Key para WEb Token
const SECRET_KEY = process.env.SECRET_KEY;


//const app_principal = require('./routes/routes');
const app_principal = require('./routes/routes');
app.use(app_principal)

console.log("URL: "+process.env.MONGODB_URL)
// Conexion BD
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})


 
// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 
// SERVER LISTENING
app.listen( process.env.PORT , () => {
    console.log('Servidor web se ejecuta en el puerto ', process.env.PORT)
})

module.exports = connect;