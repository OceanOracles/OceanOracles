window.GuideListView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  render: function() {
    _.each(this.collection.models, function(guide) {
      this.$el.append(new GuideListItemView({model: guide}).$el);
    }, this);
  }

});