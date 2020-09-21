const express = require('express');
const path = require('path');

const app = express();

app.get('/download', (req, res) => {

    res.download(path.join(__dirname, '../downloads/agenda--beta-v0.2.0.apk'), 'agenda--beta-v0.2.0.apk');

});


module.exports = app;