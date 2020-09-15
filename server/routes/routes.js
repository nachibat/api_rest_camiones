const express = require('express');

const app = express();

app.use(require('./choferes.route'));

module.exports = app;