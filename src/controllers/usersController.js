const {validationResult} = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */

module.exports = {
    login: (req,res) => {
        res.render("./users/login")
    },
    register: (req,res) => {
        res.render("./users/register")
    },
    processRegister: (req,res) => {
        const errors = validationResult(req)

        if (errors.errors.length > 0) {/* Si hay errores, entra */
            return res.render("./users/register", {
                errors: errors.mapped(), /* mapped convierte un array en objeto */
                oldData: req.body, /* mantendremos los datos ingresador por el usuario */
            })
        }
        
    },
}