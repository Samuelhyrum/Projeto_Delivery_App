const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const allProducts = await productsService.getAll();
  return res.status(200).json(allProducts);
};

const create = async (req, res) => {
  const product = await productsService.create(req.body);
  return res.status(201).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const updatedProd = await productsService.update(id, product);
  if (updatedProd.type) return res.status(400).json({ message: updatedProd.message });
  return res.status(200).json(updatedProd);
};

const findByName = async (req, res) => {
  const { name } = req.params;
  const result = await productsService.findByName(name);
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deletedProd = await productsService.remove(id);
  if (deletedProd.type) return res.status(400).json({ message: deletedProd.message });
  return res.status(204).json(deletedProd);
};

module.exports = {
    getAll,
    create,
    getById,
    update,
    remove,
    findByName,
};
