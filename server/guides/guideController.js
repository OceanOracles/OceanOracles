var Guide = require('./guideModel');

module.exports = {

  allGuides: function(req, res, next) {
    Guide.find({}, function(err, guides) {
      err ? next(err) : res.send(guides);
    });
  },

  createGuide: function(req, res, next) {
    var title = req.body.title;
    var userId = req.user._id;

    Guide.findOne({ title: title }, function(err, match) {
      if (err) {
        next(err);
      } else if (match) {
        res.send(match);
      } else {
        var newGuide = { title: title, userId: userId };
        Guide.create(newGuide, function(err, guide) {
          err ? next(err) : res.json(guide);
        });
      }
    });
  },

  findGuide: function(req, res, next, guideId) {
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

  showGuide: function(req, res) {
    res.json(req.guide);
  },

  editGuide: function(req, res, next) {
    var newGuide = { title: req.body.title, updatedAt: Date.now() };
    Guide.findByIdAndUpdate(req.guide._id, newGuide, function(err, updatedGuide) {
      err ? next(err) : res.send(updatedGuide);
    });
  },

  deleteGuide: function(req, res, next) {
    Guide.findByIdAndRemove(req.guide._id, function(err, result) {
      result ? res.status(204).send() : next(new Error("No Guide with that Id"));
    });
  },

  isGuideCreator: function(req, res, next) {
    if (''+req.user._id === ''+req.guide.userId) {
      next();
    } else {
      next(new Error("User not authorized to change this Guide"));
    }
  }

};
