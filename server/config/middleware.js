var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // custom middleware

module.exports = function (app, express) {
  // var userRouter = express.Router();
  // var guideRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // app.use('/api/users', userRouter);
  // app.use('/api/guides', guideRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject routers into respective route files
  // require('../users/userRoutes.js')(userRouter);
  // require('../guides/guideRoutes.js')(guideRouter);
};
