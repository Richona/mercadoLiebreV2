// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const {login,register,processRegister, loginProcess, profile} = require('../controllers/usersController');

// ************ Middleware Require ************
const {uploadUsers} = require("../middlewares/uploadFiles")
const validacionesRegister = require("../validations/usersRegisterValidator")


router
    .get('/register', register)
    .post('/register', uploadUsers.single("file"), validacionesRegister, processRegister)
    .get('/login', login)
    .post('/login', loginProcess)
    .get("/profile", profile)


module.exports = router;