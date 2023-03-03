const express = require('express');

const router = express.Router();
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
const jwtValidate = require('../auth/jwtValidate');

router.get('/', findAll);
router.post('/', jwtValidate, create);
router.get('/:id', getById);
router.get('/seller/:id', getSalesBySellerId);
router.get('/user/:id', getSalesByUserId);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/status/:status', getByStatus);

module.exports = router;
