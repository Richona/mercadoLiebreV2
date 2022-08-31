// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const {login,register,processRegister, loginProcess, profile} = require('../controllers/usersController');

// ************ Middleware Require ************
const {uploadUsers} = require("../middlewares/uploadFiles")
const validacionesRegister = require("../validations/usersRegisterValidator")
const guestMiddleware = require("../middlewares/guestMiddleware")/* Middleware para no permitir ingresar a vistas si estamos logueado */
const authMiddleware = require("../middlewares/authMiddleware")/* Middleware para no permitir ingresar a vistas si no estamos logueado */

router
    .get('/register',guestMiddleware, register)
    .post('/register', uploadUsers.single("file"), validacionesRegister, processRegister)
    .get('/login', guestMiddleware, login)
    .post('/login', loginProcess)
    .get("/profile", authMiddleware, profile)


module.exports = router;