// ===============
// Puerto
// ===============

process.env.PORT = process.env.PORT || 3000;


// ===============
// Entorno
// ===============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// =================
// Vencimiento Token
// =================
// 60 segundos
// 60 minutoss
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = '7 days';


// =====================
// SEED de autenticación
// =====================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';


// ===============
// Base de datos
// ===============

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/playa';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;