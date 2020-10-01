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

app.get('/usuario/consulta/:id', verificaToken, (req, res) => {

    const id = req.params.id;

    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Usuario no encontrado',
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });

});

app.get('/usuario/listado', verificaToken, (req, res) => {

    Usuario.find({ estado: true }).exec((err, usuarios) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarios
        });

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

app.put('/usuario/:id', verificaToken, function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['username', 'nombre', 'email', 'img', 'role']);

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

app.post('/usuario/cambiopassword', verificaToken, (req, res) => {

    const id = req.usuario._id;
    const user = req.usuario.username;
    const oldPassword = req.body.oldpassword;
    const newPassword = req.body.newpassword;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            ok: false,
            message: 'Se requieren contraseñas'
        });
    }

    Usuario.findOne({ username: user }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'Problemas con token enviado. Vuelva a iniciar sesion'
            });
        }

        if (!usuarioDB.estado) {
            return res.status(400).json({
                ok: false,
                message: 'Problemas con token enviado. Vuelva a iniciar sesion'
            });
        }

        if (!bcrypt.compareSync(oldPassword, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña actual incorrecta'
            });
        }

        Usuario.findByIdAndUpdate(id, { password: bcrypt.hashSync(newPassword, 10) }, { new: true }, (err, usuarioDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Usuario no encontrado'
                });
            }

            return res.json({
                ok: true,
                usuarioDB
            });

        });

    });
});


module.exports = app;