var Step = require('./stepModel');
var Guide = require('../guides/guideModel');
var User = require('../users/userModel');

module.exports = {

  createStep: function(req, res, next) {
    var stepNum = req.body.stepNum;
    var content = req.body.content;
    var userId = req.user._id;
    var guideId = req.body.guideId;

    Step.findOne({ guideId: guideId, stepNum: stepNum }, function(err, match) {
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
          if (err) { next(err); }
          else {
            Guide.findById(guideId, function(err, guide) {
              if (err) { next(err); }
              else if (guide) {
                guide.push(step._id);
                guide.updatedAt = Date.now();
                guide.save(function(err) {
                  err ? next(err) : res.send(step);
                });
              } else { res.status(500).send(); }
            });
          }
        });
      }
    });
  },

  findStep: function(req, res, next, guideId) {
    Guide.findOne({ _id: guideId }, function(err, guide) {
      if (guide) {
        req.guide = guide;
        next();
      } else if (err) {
        next(err);
      } else {
        next(new Error("No Guide with that Id"));
      }
    });
  },

  showStep: function(req, res) {
    res.json(req.guide);
  },

  editStep: function(req, res, next) {
    var newGuide = { title: req.body.title, updatedAt: Date.now() };
    Guide.findByIdAndUpdate(req.guide._id, newGuide, function(err, updatedGuide) {
      err ? next(err) : res.send(updatedGuide);
    });
  },

  isStepCreator: function(req, res, next) {
    if (''+req.user._id === ''+req.step.userId) {
      next();
    } else {
      next(new Error("User not authorized to change this Step"));
    }
  },

  isGuideCreator: function(req, res, next) {
    User.findOne({ _id: req.user._id }, function(err, user) {
      if (user.guides.indexOf(req.guideId) >= 0) {
        console.log("matched");
      } else {
        console.log("not matched");
      }
    });
  }

};
