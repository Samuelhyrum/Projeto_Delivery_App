const salesService = require('../services/sales.service');

const create = async (req, res) => {
    const createdSale = await salesService.create(req.body);
    if (createdSale.type) return res.status(409).json({ message: createdSale.message });
    return res.status(201).json(createdSale);
};

const findAll = async (req, res) => {
    const sales = await salesService.findAll();
    return res.status(200).json(sales);
  };

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getById(id);
    if (result.type) return res.status(404).json({ message: result.message });
    return res.status(200).json(result);
};

const getSalesByUserId = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getSalesByUserId(id);
    if (result.type) return res.status(404).json({ message: result.message });
    return res.status(200).json(result);
};

const getSalesBySellerId = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getSalesBySellerId(id);
    if (result.type) return res.status(404).json({ message: result.message });
    return res.status(200).json(result);
};

const update = async (req, res) => {
    const { id } = req.params;
    const sale = req.body;
    const updatedSale = await salesService.update(id, sale);
    if (updatedSale.type) return res.status(400).json({ message: updatedSale.message });
    return res.status(200).json(updatedSale);
  };

const remove = async (req, res) => {
    const { id } = req.params;
    const deletedSale = await salesService.remove(id);
    if (deletedSale.type) return res.status(400).json({ message: deletedSale.message });
    return res.status(204).json(deletedSale);
};

const getByStatus = async (req, res) => {
    const { status } = req.params;
    const result = await salesService.getByStatus(status);
    if (result.type) return res.status(404).json({ message: result.message });
    return res.status(200).json(result);
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