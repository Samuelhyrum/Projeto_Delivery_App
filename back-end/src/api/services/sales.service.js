const { Sale } = require('../../database/models');
const usersService = require('./users.service');

const create = async (sale) => {
    const { userId, sellerId } = sale;
    const userIdExists = await usersService.getById(userId);
    if (userIdExists.type) return { type: 'ID_NOT_FOUND', message: 'User id not found' };
    
    const sellerIdExists = await usersService.getById(sellerId);
    if (sellerIdExists.type) return { type: 'ID_NOT_FOUND', message: 'Seller id not found' };

    const checkRole = await usersService.getByRole(sellerIdExists.role);
    if (checkRole.role !== 'seller') {
        return { type: 'PERMISSION_DENIED', message: 'User role is not seller' };
    }

    const createdSale = await Sale.create(sale);
    return createdSale;
};

const findAll = async () => {
    const result = await Sale.findAll();
    return result;
};

const getById = async (id) => {
    const [result] = await Sale.findAll({ where: { id } });
    if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
    return result;
};

const getSalesBySellerId = async (sellerId) => {
    const result = await Sale.findAll({ where: { sellerId } });
    if (result.length <= 0) return { type: 'ID_NOT_FOUND', message: 'Seller id not found' };
    return result;
};

const getSalesByUserId = async (userId) => {
    const result = await Sale.findAll({ where: { userId } });
    if (result.length <= 0) return { type: 'ID_NOT_FOUND', message: 'User id not found' };
    return result;
};

const update = async (id, sale) => {
    const [rowsAffected] = await Sale.update(sale, { where: { id } });
    if (rowsAffected < 1) return { type: 'UPDATE_FAILED', message: 'Something went wrong' };
    const updatedSale = await getById(Number(id));
    return updatedSale;
  };

const remove = async (id) => {
    const result = await getById(Number(id));
    if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
    const removed = await Sale.destroy({ where: { id } });
    return removed;
};

module.exports = { create, findAll, getById, update, getSalesBySellerId, getSalesByUserId, remove };
