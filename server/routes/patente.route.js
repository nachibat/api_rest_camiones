const express = require('express');
const Patente = require('../models/patente.model');

const app = express();

app.get('/patentes', (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 5;

    Patente.find({ activo: true }, 'nombre apellido patente telefono')
        .skip(desde)
        .limit(limite)
        .exec((err, patentes) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Patente.countDocuments({ activo: true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    total_registros: cantidad,
                    patentes
                });

            });


        });

});

app.post('/patentes', (req, res) => {

    const body = req.body

    const patente = new Patente({
        nombre: body.nombre,
        apellido: body.apellido,
        patente: body.patente,
        telefono: body.telefono
    });

    patente.save((err, patenteDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            patente: patenteDB
        });

    });

});

module.exports = app;