var LernhowRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'signup': 'signup',
    '*nF': 'notFound'
  },
  initialize: function() {
    this.globalNav = new GlobalNavView();
    $('.header').html(this.globalNav.el);
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
  notFound: function() {
    this.notFoundView = new NotFoundView();
    $('#container').html(this.notFoundView.el);
  }
});

utils.loadTemplates(['GlobalNavView', 'HomeView', 'SignupView', 'NotFoundView'], function() {
  var app = new LernhowRouter();
  Backbone.history.start({ pushState: true });
});
