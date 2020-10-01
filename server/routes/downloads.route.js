const express = require('express');
const path = require('path');

const app = express();

app.get('/download', (req, res) => {

    res.download(path.join(__dirname, '../downloads/agenda.apk'), 'agenda.v1.4.0.apk');

});


module.exports = app;