const express = require('express');

const router = express.Router();

const { create } = require('../controllers/users.controller');

router.post('/', create);

module.exports = router;