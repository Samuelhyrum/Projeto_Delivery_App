const crypto = require('crypto');
const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../../database/models');

const login = async (email, passw) => {
    const password = crypto.createHash('md5').update(passw).digest('hex');
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { type: 'NOT_FOUND', message: 'Not found' };
    const { password: _password, ...userWithoutIdAndPassword } = user.dataValues;
    const token = createToken(userWithoutIdAndPassword);
    return { token };
};

module.exports = { login };