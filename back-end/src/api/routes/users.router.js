const express = require('express');

const router = express.Router();

const { 
    create, 
    getByRole, 
    findAll, 
    getById, 
    update, 
    remove, 
    createWithRole,
} = require('../controllers/users.controller');
const jwtValidate = require('../auth/jwtValidate');

router.post('/', create);
router.post('/admin', jwtValidate, createWithRole);
router.get('/', findAll);
router.get('/:id', getById);
router.get('/role/:role', getByRole);
router.put('/:id', update);
router.delete('/:id', jwtValidate, remove);

module.exports = router;