const express = require('express');
const Patente = require('../models/patente.model');

const app = express();

// ==========================
// Listado de patentes
// ==========================

app.get('/patentes', (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 5;

    Patente.find({ activo: true }, 'nombre apellido patente telefono')
        .skip(desde)
        .limit(limite)
        .sort('apellido')
        .exec((err, patentes) => {

            if (err) {
                return res.status(500).json({
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

// ==========================
// Busqueda de patente
// ==========================

app.get('/patentes/buscar/apellido/:termino', (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 5;

    const termino = req.params.termino;
    const regexTermino = new RegExp(termino, 'i');

    Patente.find({ apellido: regexTermino, activo: true })
        .skip(desde)
        .limit(limite)
        .exec((err, patentes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Patente.countDocuments({ apellido: regexTermino, activo: true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    total_registros: cantidad,
                    patentes
                });

            });

        });

});

app.get('/patentes/buscar/nombre/:termino', (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 5;

    const termino = req.params.termino;
    const regexTermino = new RegExp(termino, 'i');

    Patente.find({ nombre: regexTermino, activo: true })
        .skip(desde)
        .limit(limite)
        .exec((err, patentes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Patente.countDocuments({ nombre: regexTermino, activo: true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    total_registros: cantidad,
                    patentes
                });

            });

        });

});

app.get('/patentes/buscar/patente/:termino', (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 5;

    const termino = req.params.termino;
    const regexTermino = new RegExp(termino, 'i');

    Patente.find({ patente: regexTermino, activo: true })
        .skip(desde)
        .limit(limite)
        .exec((err, patentes) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Patente.countDocuments({ patente: regexTermino, activo: true }, (err, cantidad) => {

                res.json({
                    ok: true,
                    total_registros: cantidad,
                    patentes
                });

            });

        });

});


// ==========================
// Alta de patente
// ==========================

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
            return res.status(500).json({
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