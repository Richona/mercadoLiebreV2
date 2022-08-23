// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {login,register} = require('../controllers/usersController');

router
    .get('/login', login)
    .get('/register', register)


module.exports = router;