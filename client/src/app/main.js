var LernhowTemplates = [
  'GlobalNavView',
  'HomeView',
  'SignupView',
  'NotFoundView',
  'LoginView',
  'GlobalNavViewAuth',
  'GuidePreviewView'
];

var LernhowRouter = Backbone.Router.extend({

  routes: {
    '': 'index',
    'signup': 'signup',
    'login': 'login',
    'logout': 'logout',
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

  login: function(){
    this.loginView = new LoginView();
    appUtils.swapView(this.loginView);
  },

  logout: function() {
    window.localStorage.removeItem("_user.token");
    window.localStorage.removeItem("_user.name");
    this.navigate("/#", { trigger: true });
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
