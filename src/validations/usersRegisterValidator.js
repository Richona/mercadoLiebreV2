const {check} = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */

module.exports = [
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
        if (!req.file) {/* si no subio imagen entra */
            throw new Error("Tienes que subir una imagen")
        }else{/* subio img, analizamos si la ext es permitida */
            let fileExtension = path.extname(req.file.originalname)
            if (!acceptedExt.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExt.join(", ")}`)
            }
        }
        return true;
    })
]