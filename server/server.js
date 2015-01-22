var express = require('express');
var mongoose = require('mongoose');

// app server
var app = express();

// db setup
var database = 'mongodb://localhost/oceanoracles-dev';
// if (process.env.NODE_ENV === 'production') {
//   database = 'mongodb://'; // INSERT MONGOLAB URI
// }
mongoose.connect(database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.on('open', function() { console.log('mongo hooked'); });

// middleware config
require('./config/middleware.js')(app, express);

// export app
module.exports = app;