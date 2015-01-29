var LernhowTemplates = ['GlobalNavView', 'HomeView', 'SignupView', 'NotFoundView', 'LoginView', 'GlobalNavViewAuth'];

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
    // this.model = new User();
    // this.model.on('all', this.updateNav, this);
  },
  index: function() {
    appUtils.checkForToken();
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    $('.global-container').html(this.homeView.el);
    // this.globalNav.selectMenuItem('home-menu');
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
  // updateNav: function(event){
  //   switch (event){
  //     case 'tokenAccess': return appUtils.changeNavView();
  //     case 'noToken': return appUtils.changeNavViewAuth();
  //   }
  // }
});

templateUtils.loadTemplates(LernhowTemplates, function() {
  var app = appUtils.startRouter(LernhowRouter);
  appUtils.injectRouter(LernhowTemplates, app);
});
