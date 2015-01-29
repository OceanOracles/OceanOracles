var LernhowTemplates = [
  'GlobalNavView',
  'HomeView',
  'SignupView',
  'NotFoundView',
  'LoginView',
  'GlobalNavViewAuth'
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
    $('.global-container').html(this.homeView.el);
  },

  signup: function() {
    this.signupView = new SignupView();
    $('.global-container').html(this.signupView.el);
  },

  login: function(){
    this.loginView = new LoginView();
    $('.global-container').html(this.loginView.el);
  },

  logout: function(){
    window.localStorage.removeItem("_user.token");
    window.localStorage.removeItem("_user.name");
    this.navigate("/#", { trigger: true });
  },

  notFound: function() {
    this.notFoundView = new NotFoundView();
    $('.global-container').html(this.notFoundView.el);
  }

});

templateUtils.loadTemplates(LernhowTemplates, function() {
  var app = appUtils.startRouter(LernhowRouter);
  appUtils.injectRouter(LernhowTemplates, app);
});
