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

  // findGuide: function(req, res, next, guideId){

  // },

  // showGuide: function(req, res, next){

  // },

  // editGuide: function(req, res, next){

  // },

  // deleteGuide: function(req, res, next){

  // }

};
