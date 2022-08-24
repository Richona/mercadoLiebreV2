// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");

// ************ Controller Require ************
const {login,register,processRegister} = require('../controllers/usersController');

// ************ Middleware Require ************
const {uploadUsers} = require("../middlewares/uploadFiles")

const {check} = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */
const validaciones = [
    check("nombreApellido")
        .notEmpty()/* notEmpty valida que el campo no este vacio */.withMessage("Debe completar el nombre y apellido"),/* withMessage Envia el mensaje de error */
    check("nameUsuario")
        .notEmpty().withMessage("Debe completar el nombre de usuario"),
    check("email")
        .notEmpty().withMessage("Debe completar el email").bail()/* Bail corta la ejecucion si hay error */
        .isEmail()/* valida si es un correo */.withMessage("Debes escribir un correo valido"),
    check("clave")
        .notEmpty().withMessage("Debe completar la clave"),
    check("confiClave")
        .notEmpty().withMessage("Debe confirmar la clave"),
    check("file").custom((value, {req}) => {

        let acceptedExt = [".jpg", ".png", ".gif", ".jpeg"]
        if (!req.file) {
            throw new Error("Tienes que subir una imagen")
        }else{
            let fileExtension = path.extname(req.file.originalname)
            if (!acceptedExt.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExt.join(", ")}`)
            }
        }
        return true;
    })
]

router
    .get('/login', login)
    .get('/register', register)
    .post('/register', uploadUsers.single("file"), validaciones, processRegister)


module.exports = router;