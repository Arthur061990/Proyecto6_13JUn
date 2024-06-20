const express = require('express');
const router = express.Router()


//Definicion de ruta para home (pagina principal)
const homeRouter = require('../controllers/home');
//Definicion de ruta para login
const loginRouter = require('../controllers/login');
//Definicion de ruta para registro de usuario
const signupRouter = require('../controllers/signup');
//Definicion de ruta para agregar producto
const add_productRouter = require('../controllers/agregar_producto');


// Ruta Home
router.get("/", homeRouter.pagina_principal);
// Usa la ruta de login
router.post('/login', loginRouter.pagina_login);
// Usa la ruta de registro
router.post('/signup', signupRouter.pagina_signup);
// Usa la ruta de agregar producto
router.post('/agregar_producto', add_productRouter.agregar_producto);

module.exports=router
