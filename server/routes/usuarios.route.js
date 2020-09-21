const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.models');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const app = express();

app.get('/usuario/', verificaToken, function(req, res) {

    return res.json({
        ok: true,
        usuario: req.usuario
    });

});

app.post('/usuario', [verificaToken, verificaAdminRole], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        username: body.username,
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {

    const id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});


module.exports = app;