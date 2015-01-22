var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js'); // custom middleware

module.exports = function (app, express) {
  // var userRouter = express.Router();
  // var guideRouter = express.Router();

  app.set('views', __dirname + '../templates');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  // app.use('/api/users', userRouter);
  // app.use('/api/guides', guideRouter);
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // serve base client-app payload
  app.get('/', function(req, res) {
    res.render('index');
  });

  // inject routers into respective route files
  // require('../users/userRoutes.js')(userRouter);
  // require('../guides/guideRoutes.js')(guideRouter);
};

  // MUST BE LAST - catch fallthrough
  app.get('/*', function(req, res) {
    res.render('index');
  });
};
