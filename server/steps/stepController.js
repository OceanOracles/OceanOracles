var Step = require('./stepModel');
var Guide = require('../guides/guideModel');
var User = require('../users/userModel');

module.exports = {

  createStep: function(req, res, next) {
    var stepNum = req.body.stepNum;
    var content = req.body.content;
    var userId = req.user._id;
    var guideId = req.body.guideId;
    var query = { guideId: guideId, stepNum: stepNum };
    Step.findOne(query, function(err, match) {
      if (err) { next(err); }
      else if (match) { res.send(match); }
      else {
        var newStep = {
          stepNum: stepNum,
          content: content,
          userId: userId,
          guideId: guideId
        };
        Step.create(newStep, function(err, step) {
          err ? next(err) : res.send(step);
        });
      }
    });
  },

  findStep: function(req, res, next, stepId) {
    Step.findOne({ _id: stepId }, function(err, step) {
      if (step) {
        req.step = step;
        next();
      } else if (err) {
        next(err);
      } else {
        next(new Error('No Step with that Id'));
      }
    });
  },

  showStep: function(req, res) {
    res.json(req.step);
  },

  editStep: function(req, res, next) {
    var newStep = { content: req.body.content, updatedAt: Date.now() };
    Step.findByIdAndUpdate(req.step._id, newStep, function(err, updatedStep) {
      err ? next(err) : res.send(updatedStep);
    });
  },

  isStepCreator: function(req, res, next) {
    if (''+req.user._id === ''+req.step.userId) {
      next();
    } else {
      next(new Error('User not authorized to change this Step'));
    }
  },

  isGuideCreator: function(req, res, next) {
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (user.guides.indexOf(req.body.guideId) >= 0) {
        next();
      } else {
        next(new Error('User not authorized to edit this Guide\'s Step'));
      }
    });
  }

};
