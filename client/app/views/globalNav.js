window.GlobalNavView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    $(this.el).html(this.template());
    return this;
  },
  selectMenuItem: function(menuItem) {
    $('.navigation li').removeClass('active');
    if (menuItem) $('.' + menuItem).addClass('active');
  }
});