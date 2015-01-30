var LernhowTemplates = [
  'GlobalNavView',
  'HomeView',
  'SignupView',
  'NotFoundView',
  'LoginView',
  'GlobalNavViewAuth',
  'GuidePreviewView',
  'GuideCreateView',
  'GuideEditView'
];

var LernhowRouter = Backbone.Router.extend({

  routes: {
    // static root
    '': 'index',

    // user authentication
    'signup': 'signup',
    'login': 'login',
    'logout': 'logout',

    // guides CRUD
    'guides/new': 'newGuide',
    'guides/edit': 'editGuide',

    // client-side catchall
    '*nF': 'notFound'
  },

  initialize: function() {
    appUtils.checkForToken();
  },

  index: function() {
    appUtils.checkForToken();
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    appUtils.swapView(this.homeView);
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
    window.localStorage.removeItem("_user.token");
    window.localStorage.removeItem("_user.name");
    this.navigate("/#", { trigger: true });
  },

  newGuide: function() {
    if (!appUtils.checkForToken()) {
      this.navigate('/');
    } else {
      this.guideCreateView = new GuideCreateView();
      appUtils.swapView(this.guideCreateView);
    }
  },

  editGuide: function() {
    if (!appUtils.checkForToken()) {
      this.navigate('/');
    } else {
      this.guideEditView = new GuideEditView();
      appUtils.swapView(this.guideEditView);
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
});
