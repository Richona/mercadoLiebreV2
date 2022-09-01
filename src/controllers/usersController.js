const {validationResult} = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */
const fs = require("fs")
const path = require("path");
const bcryptjs = require("bcryptjs")

const {loadUsers, storeUsers, actId} = require("../data/db_module");/* requerimos las funciones asociadas al json */
const User = require("../models/User")

module.exports = {
    register: (req,res) => {
        res.render("./users/register")
    },
    processRegister: (req,res) => {
        let errors = validationResult(req).mapped()/* Traemos los errores en forma de objeto */

        req.fileValidationError ?  errors = {...errors, file :{msg: req.fileValidationError}} : null /* preguntamos y asignamos un mensaje de error en file */

        User.findByField("email", req.body.email) ?  errors = {...errors, email: {msg: "Este email ya esta registrado"}}:null;/* preguntamos si el email ya esta en la base, si esta mandamos el error */

        if (Object.entries(errors).length > 0) {/* Si hay errores, entra */
            if (req.file) {
                fs.existsSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.file.filename)) && fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", "users", req.file.filename))/* existsSync busca si existe el archivo y unlinkSync lo elimina */
            }

            return res.render("./users/register", {
                errors, /* mapped convierte un array en objeto */
                oldData: req.body, /* mantendremos los datos ingresador por el usuario */
            })
        }

        const {nombreApellido, nameUsuario,email,fecha,domicilio,uno,electro,moda,hogar,jugueteria,vida,clave} = req.body
        let userToCreate = {
            nombreApellido,
            nameUsuario,
            email,
            fecha,
            domicilio,
            perfil: uno ? uno:null,
            intereses: {
                electro: electro,
                moda: moda,
                hogar: hogar,
                jugueteria:jugueteria,
                vida: vida,
            },
            clave: bcryptjs.hashSync(clave, 10),
            avatar: req.file.filename
        }
        let userCreated = User.create(userToCreate)
        return res.redirect("/users/login")
    },
    login: (req,res) => {
        res.render("./users/login")
    },
    loginProcess: (req,res) => {
        let userToLogin = User.findByField("email", req.body.email)

        if(userToLogin){
            let isOkTheClave = bcryptjs.compareSync(req.body.clave, userToLogin.clave)
            if (isOkTheClave){
                delete userToLogin.clave;
                req.session.userLogged = userToLogin;
                return res.redirect("/users/profile")
            }
            return res.render("./users/login",{
                errors:{
                    email: {
                        msg: "Las credenciales son invalidades"
                    }
                }
            })
        }

        return res.render("./users/login",{
            errors:{
                email: {
                    msg: "No se encuentra este email"
                }
            }
        })
    },
    profile: (req, res) => {
		return res.render('./users/profile', {
			user: req.session.userLogged
		});
	},
    logout: (req, res) => {
        req.session.destroy(); /* borra automaticamente todo registro en session */
		return res.redirect("/");
	},
}