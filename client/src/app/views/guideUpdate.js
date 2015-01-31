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
    var newGuideTitle = this.$el.find('#G_title').val();
    var $stepFields = this.$el.find('.step-input');
    // update guide on client
    this.model.set('title', newGuideTitle);
    // update guide in DB
    this.model.updateGuide(function() {
      // update the associated steps in DB
      var stepsData = appUtils.getStepsData($stepFields, this.model);
      this.model.updateGuideSteps(stepsData, function() {
        var guideId = this.model.get('_id');
        this.router.navigate('/#guides/' + guideId, { trigger: true });
      }.bind(this));
    }.bind(this));
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    alert('deleteGuide action triggered on click');
  }

});
