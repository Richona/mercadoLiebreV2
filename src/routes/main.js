// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); /* Ruta principal */
router.get('/search', mainController.search); /* Ruta del buscador ubicado en header */

module.exports = router;
