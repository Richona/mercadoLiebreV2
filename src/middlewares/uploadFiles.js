const multer = require("multer");
const path = require("path");

const storageProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/products");
    },
    filename: (req, file, cb) => {
        cb(null, `producto-${Date.now()}${path.extname(file.originalname)}`);
    }
})
const storageUsers = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/users");
    },
    filename: (req, file, cb) => {
        cb(null, `user-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const uploadProducts = multer({
    storage: storageProducts,
    limits: {fileSize: 2000000}, /* 1 millon es 1MB, limita el peso del archivo */
    fileFilter: (req, file, cb) =>{ /* Funcion para filtrar tipo de archivos respecto a su extension */
        const fileTypes = /jpeg|jpg|png|gif/;/* Extensiones permitidas */
        const mimeType = fileTypes.test(file.mimetype); /* con test compruebo si el mimetype coincide con los valores de fileTypes */
        const extname = fileTypes.test(path.extname(file.originalname)); /* Sacamos la extension del archivo para comprobar si coincide con fileTypes */
        if(mimeType && extname){ /* Si el mimeType y extname coinciden con fileTypes, entra y guarda */
            return cb(null, true)
        };
        cb("Error: Archivo debe ser una imagen valida")/* Error que muestra si la extension subida no es aceptada */
    }
})
const uploadUsers = multer({
    storage: storageUsers,
    limits: {fileSize: 2000000}, /* 1 millon es 1MB, limita el peso del archivo */
    fileFilter: (req, file, cb) =>{ /* Funcion para filtrar tipo de archivos respecto a su extension */
        const fileTypes = /jpeg|jpg|png|gif/;/* Extensiones permitidas */
        const mimeType = fileTypes.test(file.mimetype); /* con test compruebo si el mimetype coincide con los valores de fileTypes */
        const extname = fileTypes.test(path.extname(file.originalname)); /* Sacamos la extension del archivo para comprobar si coincide con fileTypes */
        if(mimeType && extname){ /* Si el mimeType y extname coinciden con fileTypes, entra y guarda */
            return cb(null, true)
        };
        cb("Error: Archivo debe ser una imagen valida")/* Error que muestra si la extension subida no es aceptada */
    }
})

module.exports = {
    uploadProducts,
    uploadUsers
}