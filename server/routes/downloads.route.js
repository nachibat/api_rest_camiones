const express = require('express');
const path = require('path');

const app = express();

app.get('/download', (req, res) => {

    res.download(path.join(__dirname, '../downloads/agenda.v1.0.0.apk'), 'agenda.v1.0.0.apk');

});


module.exports = app;