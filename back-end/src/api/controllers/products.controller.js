const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const allProducts = await productsService.getAll();
  return res.status(200).json(allProducts);
};

module.exports = {
    getAll,
};
