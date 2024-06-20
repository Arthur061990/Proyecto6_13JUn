const jwt = require('jsonwebtoken');

// Clave secreta para firmar el JWT. En producción, deberías almacenar esto de manera segura.
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token); // Mensaje de consola para depuración
    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err); // Mensaje de consola para depuración
            return res.status(500).send('Failed to authenticate token');
        }
        console.log('Decoded:', decoded); // Mensaje de consola para depuración
        req.userId = decoded.id;
        console.log("Usuario de token: " + req.userId); // Añadir mensaje de consola para depuración
        next();
    });
};

module.exports = verifyToken;
