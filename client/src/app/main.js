var LernhowTemplates = ['GlobalNavView', 'HomeView', 'SignupView', 'NotFoundView'];

var LernhowRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'signup': 'signup',
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
    $('#container').html(this.homeView.el);
    // this.globalNav.selectMenuItem('home-menu');
  },
  signup: function() {
    this.signupView = new SignupView();
    $('#container').html(this.signupView.el)
  },
  logout: function(){
    delete window.localStorage.currentUser;
    this.navigate("/", {trigger: true});
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
