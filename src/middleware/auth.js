const jwt = require('jsonwebtoken');

// Clave secreta para firmar el JWT. En producción, deberías almacenar esto de manera segura.
const SECRET_KEY = 'your_secret_key';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;
