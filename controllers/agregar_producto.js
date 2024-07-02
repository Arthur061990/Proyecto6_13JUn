const express = require('express');
const product_model = require(('../models/producto')); 



async function agregar_producto (req, res) {


    const data = {
        producto: req.body.producto,
        descripcion: req.body.descripcion,
        costo: req.body.costo
    };

    try {
            const add_product = await product_model.insertMany(data);
            console.log("Se agrego el producto: "+add_product);
            res.send('Se agrego el producto');
    } catch (error) {
        res.status(500).send('Error agregando el producto.');
    }
};

module.exports = { agregar_producto};