var express = require('express');
var mongoose = require('mongoose');

// app server
var app = express();

// db setup
var pEnv = process.env;
var devDb = 'mongodb://localhost/oceanoracles-dev';
mongoose.connect(pEnv.MONGOLAB_URI || pEnv.MONGOHQ_URL  || devDb);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.on('open', function() { console.log('mongo hooked'); });

// middleware config
require('./config/middleware.js')(app, express);

// export app
module.exports = app;