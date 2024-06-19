/*const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://user:root@cluster0.kjjkelm.mongodb.net/Usuarios");

// Conexion BD
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})*/
const mongoose = require('mongoose')
// Modelo de Usuario
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const user_model = new mongoose.model("usuarios_registrados", userSchema);

module.exports = user_model;