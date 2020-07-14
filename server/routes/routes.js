const express = require('express');

const app = express();

app.use(require('./patente.route'));

module.exports = app;