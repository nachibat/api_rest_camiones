require('./config/config');

const express = require('express');
const app = express();

// Configuración del body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/patentes', (req, res) => {
    res.json({
        mensaje: 'Consulta de patentes'
    });
});

app.post('/patente', (req, res) => {

    const body = req.body

    res.json({
        mensaje: 'Alta de patente',
        body
    })
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puesto: ' + process.env.PORT);
});