var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var partials = require('express-partials');
var helpers = require('./helpers.js');

module.exports = function (app, express) {
  var userRouter = express.Router();
  // var guideRouter = express.Router();

  // view setup
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.use(partials());

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // serve base-client-app payload
  app.get('/', function(req, res) {
    res.render('index');
  });

  // serve static assets for client-app
  app.use(express.static(path.join(__dirname, '/../../client')));

  // api routers
  app.use('/api/users', userRouter);
  // app.use('/api/guides', guideRouter);

  // error handlers
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject routers into respective route files
  require('../users/userRoutes.js')(userRouter);
  // require('../guides/guideRoutes.js')(guideRouter);

};
