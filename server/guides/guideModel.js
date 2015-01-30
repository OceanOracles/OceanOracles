var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GuideSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.ObjectId, ref: 'users' },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('guides', GuideSchema)
