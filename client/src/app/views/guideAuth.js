window.GuideAuthView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'click .delete-guide': 'deleteGuide'
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    this.router.guides.deleteGuide(this.model, function() {
      this.router.navigate('/', { trigger: true });
    }.bind(this));
  }

});