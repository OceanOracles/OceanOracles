var guideController = require('./guideController');
var auth = require('../users/userController');

module.exports = function(app) {
  // app.param('guideId', guideController.findGuide);

  app.route('/')
    .get(guideController.allGuides)
    .post(auth.checkAuth, guideController.createGuide);

  // app.route('/:guideId')
  //     .get(guideController.showGuide)
  //     .put(guideController.editGuide)
  //     .delete(guideController.deleteGuide);

};
