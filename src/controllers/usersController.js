const {validationResult} = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */
const fs = require("fs")
const path = require("path");

const {loadUsers, storeUsers, actId} = require("../data/db_module");/* requerimos las funciones asociadas al json */

module.exports = {
    login: (req,res) => {
        res.render("./users/login")
    },
    register: (req,res) => {
        res.render("./users/register")
    },
    processRegister: (req,res) => {
        let errors = validationResult(req)
        errors = errors.mapped()
        if (req.fileValidationError) {
            errors = {...errors, file :{msg: req.fileValidationError}}
        }

        if (Object.entries(errors).length > 0) {/* Si hay errores, entra */
            
            if (req.file) {
                fs.existsSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.file.filename)) && fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.file.filename))/* existsSync busca si existe el archivo y unlinkSync lo elimina */
            }

            return res.render("./users/register", {
                errors, /* mapped convierte un array en objeto */
                oldData: req.body, /* mantendremos los datos ingresador por el usuario */
            })
        }

        return res.redirect("/")
    },
}