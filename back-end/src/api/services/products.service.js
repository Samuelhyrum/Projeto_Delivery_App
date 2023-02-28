const { Product } = require('../../database/models');

const getAll = async () => {
  const user = await Product.findAll();
  return user;
};


module.exports = { getAll };
