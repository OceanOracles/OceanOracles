var userController = require('./userController');


module.exports = function(app) {
  // app === userRouter injected from config/middleware
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.post('/checkauth', userController.checkAuth);
};