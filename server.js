'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = require('./configs/express');

var port = process.env.PORT || 8080;

app.listen(port);

console.log('api running on ' + port);

module.exports = app;
