/**
 * Template files located in client/src/templates
 */
var LernhowTemplates = [
  'GlobalNavView',
  'HomeView',
  'SignupView',
  'NotFoundView',
  'LoginView',
  'GlobalNavViewAuth',
  'GuideListItemView',
  'GuideCreateView',
  'GuideUpdateView',
  'GuideView',
  'GuideAuthView'
];

var LernhowRouter = Backbone.Router.extend({

  routes: {
    // Home page
    '': 'index',

    // User authentication
    'signup': 'signup',
    'login': 'login',
    'logout': 'logout',

    // Guides CRUD (minus Delete)
    'guides/new': 'newGuide',
    'guides/:guideId': 'viewGuide',
    'guides/:guideId/edit': 'editGuide',

    // Client catchall
    '*nF': 'notFound'
  },

  initialize: function() {
    appUtils.checkForToken();
    this.guides = new Guides();
    this.guides.fetch();
  },

  index: function() {
    appUtils.checkForToken();
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    appUtils.swapView(this.homeView);

    this.guides.fetch({
      success: function(collection, models, req) {
        this.guideListView = new GuideListView({ collection: collection });
        appUtils.swapView(this.guideListView, '.guide-previews-container');
      }
    })
  },

  signup: function() {
    this.signupView = new SignupView();
    appUtils.swapView(this.signupView);
  },

  login: function() {
    this.loginView = new LoginView();
    appUtils.swapView(this.loginView);
  },

  logout: function() {
    window.localStorage.removeItem('_user.token');
    window.localStorage.removeItem('_user.Id');
    this.navigate('/#', { trigger: true });
  },

  viewGuide: function(guideId) {
    this.guides.fetch({
      success: function(collection, models, req) {
        var guide = collection.findWhere({ _id: guideId });
        guide.getGuideSteps(function(steps) {
          var userId = guide.get('userId');
          guide.set('steps', steps);
          var trueId = window.localStorage.getItem('_user.Id');
          var authed = appUtils.checkForToken() && userId === trueId;
          if (authed) {
            this.guideView = new GuideAuthView({ model: guide });
          } else {
            this.guideView = new GuideView({ model: guide });
          }
          appUtils.swapView(this.guideView);
        });
      }
    });
  },

  newGuide: function() {
    if (!appUtils.checkForToken()) {
      this.navigate('/');
    } else {
      var viewData = { model: new Guide(), steps: [] };
      this.guideCreateView = new GuideCreateView(viewData);
      appUtils.swapView(this.guideCreateView);
    }
  },

  editGuide: function(guideId) {
    if (!appUtils.checkForToken()) {
      this.navigate('/');
    } else {
      this.guides.fetch({
        success: function(collection, models, req) {
          var guide = collection.findWhere({ _id: guideId });
          guide.getGuideSteps(function(steps) {
            guide.set('steps', steps);
            this.guideUpdateView = new GuideUpdateView({ model: guide });
            appUtils.swapView(this.guideUpdateView);
          });
        }
      });
    }
  },

  notFound: function() {
    this.notFoundView = new NotFoundView();
    appUtils.swapView(this.notFoundView);
  }

});

templateUtils.loadTemplates(LernhowTemplates, function() {
  var app = appUtils.startRouter(LernhowRouter);
  appUtils.injectRouter(LernhowTemplates, app);
  $(window).on('resize', appUtils.footerFix);
});
