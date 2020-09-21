const express = require('express');

const app = express();

app.use(require('./choferes.route'));
app.use(require('./usuarios.route'));
app.use(require('./login.route'));
app.use(require('./downloads.route'));

module.exports = app;