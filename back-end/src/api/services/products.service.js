// const { Op } = require('sequelize'); // biblioteca de operadores
const { Product } = require('../../database/models');

const getAll = async () => {
  const product = await Product.findAll();
  return product;
};

const create = async (product) => {
  const productCreated = await Product.create(product);
  return productCreated;
};

const getById = async (id) => {
  const [result] = await Product.findAll({ where: { id } });
  if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
  return result;
};

const update = async (id, product) => {
  const [rowsAffected] = await Product.update(product, { where: { id } });
  if (rowsAffected < 1) return { type: 'UPDATE_FAILED', message: 'Something went wrong' };
  const updatedProd = await getById(Number(id));
  return updatedProd;
};

const findByName = async (name) => {
  const [result] = await Product.findAll({ where: { name } });
  if (!result) return { type: 'NAME_NOT_FOUND', message: 'Name not found' };
  return result;
};

const remove = async (id) => {
  const [result] = await Product.findAll({ where: { id } });
  if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
  const removed = await Product.destroy({ where: { id } });
  return removed;
};

module.exports = { getAll, create, getById, update, remove, findByName };
