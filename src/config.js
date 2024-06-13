const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://user:root@cluster0.kjjkelm.mongodb.net/Usuarios");

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("Usuarios_Registrados", Loginschema);

module.exports = collection;