

/**
 * Enrutador Express para manejar las rutas relacionadas con los usuarios.
 * @module Routes/Api/Users
 */

const express = require('express');
const router = express.Router();
const controller = require('../Users/User.controller');

/**
 * Ruta para el registro de usuarios.
 * @name POST /registrarse
 * @function
 * @memberof module:Routes/Api/Users
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
router.post('/registrarse', controller.signUpUser);

/**
 * Ruta para el inicio de sesión de usuarios.
 * @name POST /Login
 * @function
 * @memberof module:Routes/Api/Users
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
router.post('/Login', controller.loginUser);

module.exports = router;




