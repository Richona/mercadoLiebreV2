// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {login,register,processRegister} = require('../controllers/usersController');

router
    .get('/login', login)
    .get('/register', register)
    .post('/register', processRegister)


module.exports = router;