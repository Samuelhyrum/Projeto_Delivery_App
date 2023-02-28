const express = require('express');
const loginRoute = require('./routes/login.router');

const accessControl = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const app = express();
app.use(express.json());
app.use(accessControl); 
// não removam essa função nem essa linha acima, linha necessária para conseguir usar o axios sem erro de cors.

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoute);

module.exports = app;
