const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models');

// ========================
// verificar token
// ========================

const verificaToken = (req, res, next) => {

    const token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        Usuario.findOne({ username: decoded.usuario.username }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Token no válido'
                });
            }

            if (!usuarioDB.estado) {
                return res.status(400).json({
                    ok: false,
                    message: 'Token no válido'
                });
            }

            req.usuario = usuarioDB;
            next();

        });


    });


}

const verificaAdminRole = (req, res, next) => {

    const token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        Usuario.findOne({ username: decoded.usuario.username }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'Token no válido'
                });
            }

            if (usuarioDB.role === 'USER_ROLE') {
                return res.status(400).json({
                    ok: false,
                    message: 'El usuario no es administrador'
                });
            }

            req.usuario = usuarioDB;
            next();



        });

    });

}

module.exports = {
    verificaToken,
    verificaAdminRole
}