require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Configuración del body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuracion de ruta estatica
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de cabeceras y CORS (la configuración va antes de las rutas)
app.use(cors({ origin: true, credentials: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
    next();
});

// Configuración global de las rutas
app.use(require('./routes/routes'));



// Coneccion a base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE!');

    });

// Inicio y escucha del servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puesto: ' + process.env.PORT);
});