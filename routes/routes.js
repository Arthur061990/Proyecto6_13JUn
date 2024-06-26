const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/auth');

//Definicion de ruta para home (pagina principal)
const homeRouter = require('../controllers/home');
//Definicion de ruta para login
const loginRouter = require('../controllers/login');
//Definicion de ruta para registro de usuario
const signupRouter = require('../controllers/signup');
//Definicion de ruta para agregar producto
const add_productRouter = require('../controllers/agregar_producto');
//Definicion de ruta para cambiar contraseña
const cambiarPassword = require('../controllers/modificar_password');
//Definicion de ruta para eliminar producto
const eliminarProducto = require('../controllers/eliminar_producto');
//Definicion de ruta para obtener todos los productos
const obtenerProductos = require('../controllers/obtener_productos');


// Ruta Home
router.get("/", homeRouter.pagina_principal);
// Usa la ruta de login
//router.post('/login',verifyToken, loginRouter.pagina_login);
router.post('/login', loginRouter.pagina_login);
// Usa la ruta de registro
router.post('/signup', signupRouter.pagina_signup);
// Usa la ruta de agregar producto
router.post('/agregar_producto', add_productRouter.agregar_producto);
// Usa la ruta de modificar password
router.put('/modificar_password', verifyToken, cambiarPassword.modificar_password);
// Usa la ruta de modificar password
router.put('/eliminar_producto', eliminarProducto.eliminar_producto);
// Usa la ruta para obtener todos los productos
router.get('/obtener_productos', verifyToken, obtenerProductos.obtener_productos);

module.exports=router
