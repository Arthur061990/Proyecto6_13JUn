const mongoose = require('mongoose')
// Modelo de Usuario
const productSchema = new mongoose.Schema({
    producto: {
        type:String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    costo: {
        type: String,
        required: true
    }
});


const product_model = new mongoose.model("productos", productSchema);

module.exports = product_model;