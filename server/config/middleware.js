var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  // var guideRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  app.use(express.static(path.join(__dirname, '/../../client')));
  app.use('/api/users', userRouter);
  // app.use('/api/guides', guideRouter);

  // inject routers into respective route files
  require('../users/userRoutes.js')(userRouter);
  // require('../guides/guideRoutes.js')(guideRouter);
};
