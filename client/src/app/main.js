var LernhowTemplates = ['GlobalNavView', 'HomeView', 'SignupView', 'NotFoundView', 'LoginView', 'GuideView', 'GuidesView'];

var LernhowRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'signup': 'signup',
    'login': 'login',
    'logout': 'logout',
    '*nF': 'notFound'
  },
  initialize: function() {
    this.globalNav = new GlobalNavView();
    $('.main-header-container').html(this.globalNav.el);
  },
  index: function() {
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    $('.global-container').html(this.homeView.el);
    this.guides = new Guides();
    var options = {
      el: '.all-guides',
      collection: this.guides,
      preview: true
    };
    this.guidesView = new GuidesView(options);
  },
  signup: function() {
    this.signupView = new SignupView();
    $('.global-container').html(this.signupView.el)
  },
  login: function(){
    this.loginView = new LoginView();
    $('.global-container').html(this.loginView.el)
  },
  logout: function(){
    window.localStorage.removeItem("_token");
    this.navigate("/#", {trigger: true});
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
