var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
  stepNum: { type: Number, required: true, max: 5, min: 1 },
  content: { type: String },
  userId: { type: Schema.ObjectId, ref: 'users' },
  guideId: { type: Schema.ObjectId, ref: 'guides' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('steps', StepSchema);
