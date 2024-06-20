const express = require('express');
const product_model = require(('../models/producto')); 
const Product = require('../models/producto'); 


async function eliminar_producto (req, res) {


    try {
        const nombreProducto = req.body.producto; 
        const resultado = await Product.deleteOne({ producto: nombreProducto });

        if (resultado.deletedCount === 1) {
            return res.status(200).json({ message: 'Producto eliminado correctamente' });
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error eliminando el producto:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
    
};

module.exports = { eliminar_producto};