window.GuideUpdateView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'click .create-edit-guide': 'updateGuide',
    'click .delete-guide': 'deleteGuide'
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
  },

  updateGuide: function(e) {
    e && e.preventDefault();
    // TODO: get updated fields and update model
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    alert('deleteGuide action triggered on click');
  }

});
