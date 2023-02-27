const express = require('express');

const router = express.Router();

const { login } = require('../controllers/login.controller');
const checkLogin = require('../middlewares/checkLogin');

router.post('/', 
checkLogin,
login);

module.exports = router;