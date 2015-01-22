Lernhow.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$el = options.el;
  },
  routes: {
    '': 'index'
  },
  swapView: function(view) {
    this.$el.html(view.render().el);
  },
  index: function() {
    // get all guides
    // init guidesView
    // swap the guidesView into place
    // this.swapView(guidesView);
    alert("Index Route hit on Client");
  }
});