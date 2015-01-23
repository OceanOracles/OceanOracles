window.Lernhow = {};

Lernhow.Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function() {
    console.log('Lernhow CLIENT is live ...');
    this.globalNav = new GlobalNavView();
    $('.header').html(this.globalNav.el);
  },
  index: function(id) {
    if (!this.homeView) {
      this.homeView = new HomeView();
    }
    $('#container').html(this.homeView.el);
    // this.globalNav.selectMenuItem('home-menu');
  }
});

utils.loadTemplates(['GlobalNavView'], function() {
  new Lernhow.Router();
  Backbone.history.start({ pushState: true });
});
