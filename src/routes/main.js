// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

// ************ Middlewares Require ************
const colorValidator = require("../validations/colorsValidator")

router.get('/', mainController.index); /* Ruta principal */
router.get('/search', mainController.search); /* Ruta del buscador ubicado en header */
router.get('/color', mainController.color);
router.post('/color', colorValidator, mainController.colorPost);
router.get('/gracias', mainController.graciass);

module.exports = router;
