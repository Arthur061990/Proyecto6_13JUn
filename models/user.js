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