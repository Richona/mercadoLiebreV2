// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); /* Ruta de productos en general, ubicada en header "Todos los productos" */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); /* Ruta para agregar un productos, ubicada en header "vender" */
router.post('/create', productsController.store); /* Ruta para guardar un productor, haciendo click en boton "guardar" */


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); /* Ruta para cada producto en detalle, haciendo click en un producto accedes. */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /* Ruta para editar un producto, boton "editar producto" ubicado en la vista de detalle de cada producto */
router.put('/update/:id', productsController.update); /* Ruta para guardar la edicion de un producto. haciendo click en "guardar producto" */


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* Ruta para eliminar un producto, ubicado en el detalle de cada producto */


module.exports = router;
