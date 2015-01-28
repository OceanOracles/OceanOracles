var stepController = require('./stepController');
var auth = require('../users/userController');

module.exports = function(app) {
  app.param('stepId', stepController.findStep);

  app.post('/', auth.checkAuth, stepController.isGuideCreator,
    stepController.createStep);

  app.route('/:stepId')
    .get(stepController.showStep)
    .put(auth.checkAuth, stepController.isGuideCreator,
      stepController.isStepCreator, stepController.editStep);
};
