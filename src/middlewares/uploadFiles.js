const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/products");
    },
    filename: (req, file, cb) => {
        cb(null, `producto-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const uploadProducts = multer({
    storage
})

module.exports = uploadProducts;