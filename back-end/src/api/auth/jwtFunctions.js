const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredim';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload;
  } catch (error) {
    return { isError: true, error };
  }
};

module.exports = { createToken, verifyToken };