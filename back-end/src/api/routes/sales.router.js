const express = require('express');

const router = express.Router();

const checkSales = require('../middlewares/checkSales');
const { 
    create, 
    findAll, 
    getById, 
    update, 
    getSalesBySellerId, 
    getSalesByUserId, 
    remove,
} = require('../controllers/sales.controller');

router.get('/', findAll);
router.post('/', checkSales, create);
router.get('/:id', getById);
router.get('/seller/:id', getSalesBySellerId);
router.get('/user/:id', getSalesByUserId);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;