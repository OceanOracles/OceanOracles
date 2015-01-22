'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var GuideSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  update: { type: Date }
});

module.exports = mongoose.model('Guide', GuideSchema)
