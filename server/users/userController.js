var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {

  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var findUser = Q.nbind(User.findOne, User);

    findUser({ username: username }).then(function(user) {
      if (!user) {
        next({ status: 404, message: 'User name does not exist' });
      } else {
        return user.comparePassword(password).then(function(foundUser) {
          if (foundUser) {
            var token = jwt.encode(user, 'donotchangethissecret');
            res.json({ token: token, userId: user._id });
          } else {
            return next({ status: 404, message: 'User not found' });
          }
        });
      }
    }).fail(function(err) {
      next(err);
    });
  },

  signup: function (req, res, next) {
    var username  = req.body.username;
    var password  = req.body.password;
    var email = req.body.email;
    var findOne = Q.nbind(User.findOne, User);

    findOne({ username: username }).then(function(user) {
      if (user) {
        next({ status: 400, message: 'User name already exists' });
      } else {
        var create = Q.nbind(User.create, User);
        var newUser = { username: username, password: password, email: email };
        return create(newUser);
      }
    }).then(function(user) {
      var token = jwt.encode(user, 'donotchangethissecret');
      res.json({ token: token, userId: user._id });
    }).fail(function(err) {
      next(err);
    });
  },

  // Authentication middleware to protect private routes
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next({ status: 401, message: 'User not authorized to request this resource' });
    } else {
      var user = jwt.decode(token, 'donotchangethissecret');
      var findUser = Q.nbind(User.findOne, User);

      findUser({ username: user.username }).then(function(foundUser) {
        if (foundUser) {
          var safeUser = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            updatedAt: foundUser.updatedAt,
            createdAt: foundUser.createdAt
          };
          req.user = safeUser;
          next();
        } else {
          res.send(401);
        }
      }).fail(function(err) {
        next(err);
      });
    }
  }

};
