const express = require('express');

const router = express.Router();

const { getAll } = require('../controllers/products.controller')

router.get('/', getAll);

module.exports = router;