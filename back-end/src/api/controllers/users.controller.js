const usersService = require('../services/users.service');

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const token = await usersService.create(name, email, password);
  if (token.type) return res.status(409).json({ message: token.message });
  return res.status(201).json(token);
};

const createWithRole = async (req, res) => {
  const { name, email, password, role } = req.body;
  const token = await usersService.createWithRole(name, email, password, role);
  if (token.type) return res.status(409).json({ message: token.message });
  return res.status(201).json(token);
};

const findAll = async (req, res) => {
  const users = await usersService.findAll();
  return res.status(200).json(users);
};

const getByRole = async (req, res) => {
  const { role } = req.params;
  const result = await usersService.getByRole(role);
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.getById(id);
  if (result.type) return res.status(404).json({ message: result.message });
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updatedUser = await usersService.update(id, user);
  if (updatedUser.type) return res.status(400).json({ message: updatedUser.message });
  return res.status(200).json(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await usersService.remove(id);
  if (deletedUser.type) return res.status(400).json({ message: deletedUser.message });
  return res.status(204).json(deletedUser);
};

module.exports = {
  create,
  getByRole,
  findAll,
  getById,
  update,
  remove,
  createWithRole,
};
