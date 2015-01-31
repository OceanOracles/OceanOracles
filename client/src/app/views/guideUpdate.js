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
    this.model.set('title', newGuideTitle);
    this.model.updateGuide(function() {
      var stepsData = appUtils.getStepsData($stepFields, this.model);
      this.model.updateGuideSteps(stepsData, function() {
        var redirectUrl = '/guides/' + this.model.get('_id');
        this.router.navigate(redirectUrl, { trigger: true })
      }.bind(this));
    }.bind(this));
  },

  deleteGuide: function(e) {
    e && e.preventDefault();
    this.router.guides.deleteGuide(this.model, function() {
      this.router.navigate('/', { trigger: true });
    }.bind(this));
  }

});
