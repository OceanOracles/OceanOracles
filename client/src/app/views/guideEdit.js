window.GuideEditView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'click .create-edit-guide': 'createGuide',
    'click .delete-guide': 'deleteGuide'
  },

  render: function() {
    $(this.el).html(this.template());
  },

  createEditGuide: function(e) {
    e && e.preventDefault();
    var $guideTitleField = this.$el.find('#G_title');
    var guideData = { title: $guideTitleField.val() };

    new Guide(guideData).createOrUpdate(this.router);

    this.clearField($guideTitleField);
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    alert("createDelete");
  },

  // TODO: move this into utils
  clearField: function(field) {
    field.val('');
  }

});
