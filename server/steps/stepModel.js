'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  guide: { type: Schema.ObjectId, ref: 'Guide' },
  created: { type: Date, default: Date.now },
  update: { type: Date }

});

module.exports = mongoose.model('Step', StepSchema);
