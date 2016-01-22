'use strict';

require('dotenv').config();

var express = require('express');
var app = express();

var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var multer = require('multer');

var router = express.Router();
var config= require('./config');
var db = require('./db');
var routes =require('../app/routes')

routes(router);

//parse body contents as a JSON objects
app.use(bodyParser.json());

app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: false
}));

//multer properties for saving into file with an assigned name.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './pics/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now('mm/dd/yyyy'));
  }
});

app.use(multer({
  storage: storage
}).single('photo'));

/*override with the X-HTTP-Method-Override
header in the request. simulate DELETE/PUT
*/
app.use(methodOverride('X-HTTP-Method-Override'));

// set up our express application
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)

// route trough api
app.use('/api/v1/', router);


exports = module.exports = app;