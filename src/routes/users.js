// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");

// ************ Controller Require ************
const {login,register,processRegister} = require('../controllers/usersController');

// ************ Middleware Require ************
const {uploadUsers} = require("../middlewares/uploadFiles")
const validacionesRegister = require("../validations/usersRegisterValidator")


router
    .get('/login', login)
    .get('/register', register)
    .post('/register', uploadUsers.single("file"), validacionesRegister, processRegister)


module.exports = router;