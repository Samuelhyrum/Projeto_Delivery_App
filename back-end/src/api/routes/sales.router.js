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
    getByStatus,
} = require('../controllers/sales.controller');

router.get('/', findAll);
router.post('/', checkSales, create);
router.get('/:id', getById);
router.get('/seller/:id', getSalesBySellerId);
router.get('/user/:id', getSalesByUserId);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/status/:status', getByStatus);

module.exports = router;