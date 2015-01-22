'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: {type: String, required: true, unique: true },
    salt: { type: String },
    fbId: { type: String },
    created: { type: Date, default: Date.now },
    update: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);
