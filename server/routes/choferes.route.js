const express = require('express');
const Patente = require('../models/patente.model');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
const _ = require('underscore');

const app = express();

// ==========================
// Listado de choferes
// ==========================

app.get('/choferes', verificaToken, (req, res) => {

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
// Busqueda de choferes
// ==========================

app.get('/choferes/buscar/id/:id', verificaToken, (req, res) => {

    const id = req.params.id;

    Patente.findById(id, (err, choferDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            choferDB
        });

    });

});

app.get('/choferes/buscar/apellido/:termino', verificaToken, (req, res) => {

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

app.get('/choferes/buscar/nombre/:termino', verificaToken, (req, res) => {

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

app.get('/choferes/buscar/dni/:termino', verificaToken, (req, res) => {

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
// Alta de chofer
// ==========================

app.post('/choferes', [verificaToken, verificaAdminRole], (req, res) => {

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

// ======================
// Modificacion de chofer
// ======================

app.put('/choferes/:id', [verificaToken, verificaAdminRole], (req, res) => {

    const id = req.params.id;
    const body = _.pick(req.body, ['nombre', 'apellido', 'patente', 'telefono']);

    Patente.findByIdAndUpdate(id, body, { new: true }, (err, choferDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            chofer: choferDB
        });

    });


});

// =================
// Baja de chofer
// =================

app.delete('/choferes/:id', [verificaToken, verificaAdminRole], (req, res) => {

    const id = req.params.id;

    Patente.findByIdAndUpdate(id, { activo: false }, { new: true }, (err, choferDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!choferDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            chofer: choferDB
        });

    });

});



module.exports = app;