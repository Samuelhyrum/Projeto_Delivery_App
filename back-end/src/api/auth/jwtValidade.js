const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

const jwtKeyPath = path.join(__dirname, '..', '..', '..', 'jwt.evaluation.key');
const jwtKey = fs.readFileSync(jwtKeyPath, { encoding: 'utf-8' });
// não apague a parte acima, código não funciona com .env, tem que ser definido da mesma forma que está no teste.

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, jwtKey);
    req.decoded = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};