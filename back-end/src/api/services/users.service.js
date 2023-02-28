const crypto = require('crypto');
const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../../database/models');

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

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email }});
  return user;
}

const findByName = async (name) => {
  const user = await User.findOne({ where: { name }});
  return user;
}

module.exports = { create };