var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String },
  guides: { type: [], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(attempted) {
  var defer = Q.defer();
  var saved = this.password;
  bcrypt.compare(attempted, saved, function(err, isMatch) {
    err ? defer.reject(err) : defer.resolve(isMatch);
  });
  return defer.promise;
};

module.exports = mongoose.model('users', UserSchema);
