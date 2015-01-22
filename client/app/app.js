window.Lernhow = Backbone.View.extend({
  template: Templates['layout'],
  events: {},
  initialize: function() {
    console.log('Lernhow CLIENT is live ...');
    $('body').append(this.render().el);
    this.router = new Lernhow.Router({ el: this.$el.find('#container') });
    Backbone.history.start({ pushState: true });
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});