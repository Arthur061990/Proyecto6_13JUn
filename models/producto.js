const mongoose = require('mongoose')
// Modelo de Usuario
const productSchema = new mongoose.Schema({
    producto: {
        type:String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    }
});


const product_model = new mongoose.model("productos", productSchema);

module.exports = product_model;