var LernhowTemplates = ['GlobalNavView', 'HomeView', 'SignupView', 'NotFoundView', 'LoginView', 'GlobalNavViewAlt'];

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
    $('#container').html(this.homeView.el);
    // this.globalNav.selectMenuItem('home-menu');
  },
  signup: function() {
    this.signupView = new SignupView();
    $('#container').html(this.signupView.el)
  },
  login: function(){
    this.loginView = new LoginView();
    $('#container').html(this.loginView.el)
  },
  logout: function(){
    window.localStorage.removeItem("_token");
    this.navigate("/#", {trigger: true});
  },
  notFound: function() {
    this.notFoundView = new NotFoundView();
    $('#container').html(this.notFoundView.el);
  }
});

templateUtils.loadTemplates(LernhowTemplates, function() {
  var app = appUtils.startRouter(LernhowRouter);
  appUtils.injectRouter(LernhowTemplates, app);
});
