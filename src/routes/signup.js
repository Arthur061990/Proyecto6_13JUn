const express = require('express');
const path = require('path');
const router = express.Router();
const collection = require(("../config")); 

// Ruta para servir la página de registro
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'), (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

// Ruta para registrar un usuario
router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    try {
        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ email: data.email });

        if (existingUser) {
            res.send('User already exists. Please choose a different username.');
        } else {
            const userdata = await collection.insertMany(data);
            console.log(userdata);
            res.send('User registered successfully.');
        }
    } catch (error) {
        res.status(500).send('Error registering user.');
    }
});

module.exports = router;
