var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StepSchema = new Schema({
  stepNum: { type: Number, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.ObjectId, ref: 'users' },
  guideId: { type: Schema.ObjectId, ref: 'guides' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('steps', StepSchema);
