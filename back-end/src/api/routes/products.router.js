const express = require('express');

const router = express.Router();

const checkProduct = require('../middlewares/checkCreateProduct');
const { 
    getAll, 
    create, 
    getById, 
    update, 
    remove, 
    findByName, 
} = require('../controllers/products.controller');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/name/:name', findByName);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/', checkProduct, create);

module.exports = router;