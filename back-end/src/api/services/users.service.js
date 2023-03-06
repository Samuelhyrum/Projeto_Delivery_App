const crypto = require('crypto');
const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../../database/models');

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const findByName = async (name) => {
  const user = await User.findOne({ where: { name } });
  return user;
};

const create = async (name, email, passw) => {
    const password = crypto.createHash('md5').update(passw).digest('hex');
    const emailExists = await findByEmail(email);
    const nameExists = await findByName(name);
    if (emailExists || nameExists) return { type: 'Error', message: 'Could not create user' };
    const user = await User.create({ name, email, password, role: 'customer' });
    const { password: _password, ...userWithoutPassword } = user.dataValues;
    const token = createToken(userWithoutPassword);
    return { token };
};

const createWithRole = async (name, email, passw, role) => {
  const password = crypto.createHash('md5').update(passw).digest('hex');
  const emailExists = await findByEmail(email);
  const nameExists = await findByName(name);
  if (emailExists || nameExists) return { type: 'Error', message: 'Could not create user' };
  const user = await User.create({ name, email, password, role });
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { token };
};

const findAll = async () => {
  const result = await User.findAll();
  return result;
};

const getByRole = async (role) => {
  const [result] = await User.findAll({ where: { role } });
  if (!result) return { type: 'ROLE_NOT_FOUND', message: 'Role not found' };
  return result;
};

const getById = async (id) => {
  const [result] = await User.findAll({ where: { id } });
  if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
  return result;
};

const update = async (id, user) => {
  const [rowsAffected] = await User.update(user, { where: { id } });
  if (rowsAffected < 1) return { type: 'UPDATE_FAILED', message: 'Something went wrong' };
  const updatedUser = await getById(Number(id));
  return updatedUser;
};

const remove = async (id) => {
  const [result] = await User.findAll({ where: { id } });
  if (!result) return { type: 'ID_NOT_FOUND', message: 'Id not found' };
  const removed = await User.destroy({ where: { id } });
  return removed;
};

module.exports = { create, getByRole, findAll, getById, update, remove, createWithRole };
