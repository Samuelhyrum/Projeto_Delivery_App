const crypto = require('crypto');
const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../../database/models');

const login = async (email, passw) => {
    const password = crypto.createHash('md5').update(passw).digest('hex');
    // [Será validado que não é possível fazer login com um usuário que não existe]
    const user = await User.findOne({ where: { email, password } });
    if (!user) return { type: 'NOT_FOUND', message: 'Not found' };
    // Remove a senha do retorno da função
    const { password: _password, ...userWithoutPassword } = user.dataValues;
    // Gerando Token
    const token = createToken(userWithoutPassword);
    // O retorno deve ser o token
    return { token };
};

module.exports = { login };