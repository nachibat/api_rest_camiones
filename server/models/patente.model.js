const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
        unique: true,
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

patenteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Patente', patenteSchema);