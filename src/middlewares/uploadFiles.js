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
})
const uploadUsers = multer({
    storage: storageUsers,
    limits: {fileSize: 2000000}, /* 1 millon es 1MB, limita el peso del archivo */
})

module.exports = {
    uploadProducts,
    uploadUsers
}