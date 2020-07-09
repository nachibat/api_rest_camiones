const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patenteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    patente: {
        type: String,
        required: [true, 'La patente es obligatoria']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio']
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Patente', patenteSchema);