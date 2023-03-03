const { Sale, sequelize, SaleProduct, Product } = require('../../database/models');
const usersService = require('./users.service');

const verifyCreate = async (userId, sellerId) => {
    const userIdExists = await usersService.getById(userId);
    if (userIdExists.type) return { type: 'ID_NOT_FOUND', message: 'User id not found' };
    
    const sellerIdExists = await usersService.getById(sellerId);
    if (sellerIdExists.type) return { type: 'ID_NOT_FOUND', message: 'Seller id not found' };

    const checkRole = await usersService.getByRole(sellerIdExists.role);
    if (checkRole.role !== 'seller') {
        return { type: 'PERMISSION_DENIED', message: 'User role is not seller' };
    }
    return undefined;
};

const getById = async (id) => {
    const { dataValues } = await Sale.findOne({ where: { id }, 
        include: [
            { model: Product, as: 'products', through: { attributes: ['quantity'] } },
        ],
     });
    if (!dataValues) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
    const products = dataValues.products.map((product, index) => ({
        productName: product.name,
        price: product.price,
        quantity: dataValues.products[index].SaleProduct.quantity,
      }));
      return { ...dataValues, products };
};

const create = async ({ sale, products }) => {
    const { userId, sellerId } = sale;
    const checkingData = verifyCreate(userId, sellerId);
    if (checkingData.type) return checkingData;
    const newSaleId = await sequelize.transaction(async (t) => {
        const { dataValues: { id } } = await Sale.create(sale, { transaction: t });
        const prodPromisses = products.map((product) => {
            const { id: productId, quantity } = product;
            return SaleProduct.create({ saleId: id, productId, quantity }, { transaction: t }); 
        });
        await Promise.all(prodPromisses);
        return id;
    });
    const createdSale = await getById(newSaleId);
    return createdSale;
};

const findAll = async () => {
    const result = await Sale.findAll();
    const sales = await sequelize.transaction(async (_t) => {
        const salesPromisse = result.map(async (sale) => getById(sale.dataValues.id));
        return Promise.all(salesPromisse);
    });
    return sales;
};

const getSalesBySellerId = async (sellerId) => {
    const result = await Sale.findAll({ where: { sellerId } });
    if (result.length <= 0) return { type: 'ID_NOT_FOUND', message: 'Seller id not found' };

    const sales = await sequelize.transaction(async (_t) => {
        const salesPromisse = result.map(async (sale) => getById(sale.dataValues.id));
        return Promise.all(salesPromisse);
    });
    return sales;
};

const getSalesByUserId = async (userId) => {
    const result = await Sale.findAll({ where: { userId } });
    if (result.length <= 0) return { type: 'ID_NOT_FOUND', message: 'User id not found' };

    const sales = await sequelize.transaction(async (_t) => {
        const salesPromisse = result.map(async (sale) => getById(sale.dataValues.id));
        return Promise.all(salesPromisse);
    });
    return sales;
};

const getByStatus = async (status) => {
    const result = await Sale.findAll({ where: { status } });
    if (result.length <= 0) return { type: 'STATUS_NOT_FOUND', message: 'Status not found' };

    const sales = await sequelize.transaction(async (_t) => {
        const salesPromisse = result.map(async (sale) => getById(sale.dataValues.id));
        return Promise.all(salesPromisse);
    });
    return sales;
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

module.exports = { 
    create,
    findAll, 
    getById, 
    update, 
    getSalesBySellerId, 
    getSalesByUserId, 
    remove, 
    getByStatus,
};
