require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configuración del body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de rutas
app.use(require('./routes/patente.route'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE!');

    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puesto: ' + process.env.PORT);
});