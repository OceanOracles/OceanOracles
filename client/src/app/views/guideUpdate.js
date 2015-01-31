window.GuideUpdateView = Backbone.View.extend({

  initialize: function() {
    this.render();
    console.log("THIS IS MY MODEL: ", this.model);
  },

  events: {
    'click .delete-guide': 'deleteGuide'
  },

  render: function() {
    this.$el.html(this.template());
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    alert('deleteGuide action triggered on click');
  }

});
