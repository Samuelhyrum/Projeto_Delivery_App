const usersService = require("../services/users.service");

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const token = await usersService.create(name, email, password);
  if (token.type) return res.status(409).json({ message: token.message });
  return res.status(201).json(token);
};

module.exports = {
  create,
};
