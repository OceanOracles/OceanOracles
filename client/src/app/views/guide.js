window.GuideView = Backbone.View.extend({
  className: 'guide-container',
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});