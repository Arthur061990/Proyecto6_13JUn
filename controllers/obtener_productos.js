const express = require('express');
const product_model = require(('../models/producto')); 


async function obtener_productos (req, res) {

    try {
        const productos = await product_model.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send('Error obteniendo productos.');
    }


};

module.exports = { obtener_productos};