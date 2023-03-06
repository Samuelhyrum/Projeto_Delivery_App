const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

const jwtKeyPath = path.join(__dirname, '..', '..', '..', 'jwt.evaluation.key');
const jwtKey = fs.readFileSync(jwtKeyPath, { encoding: 'utf-8' });
// não apague a parte acima, código não funciona com .env, tem que ser definido da mesma forma que está no teste.

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ ...userWithoutPassword }, jwtKey, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, jwtKey);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = { createToken, verifyToken };