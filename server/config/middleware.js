var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  // Routers
  var userRouter = express.Router();
  var guideRouter = express.Router();
  var stepRouter = express.Router();

  // General configs
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Serves client-app
  app.use(express.static(path.join(__dirname, '/../../client/public')));

  // API router registrations
  app.use('/api/users', userRouter);
  app.use('/api/guides', guideRouter);
  app.use('/api/steps', stepRouter);

  // Inject routers into respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../guides/guideRoutes.js')(guideRouter);
  require('../steps/stepRoutes.js')(stepRouter);

  // API error handling
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // Wildcard route logic relegated to client
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../client/public/index.html'));
  });
};
