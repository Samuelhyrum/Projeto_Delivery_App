const express = require('express');

const router = express.Router();

const { 
    create, 
    getByRole, 
    findAll, 
    getById, 
    update, 
    remove, 
} = require('../controllers/users.controller');

router.post('/', create);
router.get('/', findAll);
router.get('/:id', getById);
router.get('/role/:role', getByRole);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;