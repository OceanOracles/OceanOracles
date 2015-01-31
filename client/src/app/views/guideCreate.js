window.GuideCreateView = Backbone.View.extend({

  initialize: function(options) {
    this.model.on('created', this.createSteps.bind(this));
    this.model.set('steps', options.steps);
    this.render();
  },

  events: {
    'click .create-edit-guide': 'createGuide'
  },

  render: function() {
    this.$el.html(this.template());
  },

  createGuide: function(e) {
    e && e.preventDefault();
    var guideData = { title: this.$el.find('#G_title').val() };
    this.model.createGuide(guideData);
  },

  createSteps: function(guide) {
    var steps = [];
    var $stepFields = this.$el.find('.step-input');
    this.getAndSetSteps(guide, steps, $stepFields, function(fullSteps) {
      guide.set('steps', fullSteps);
      appUtils.clearFields(this.$el.find('#G_title'));
      this.router.navigate('/', { trigger: true });
    }.bind(this));
  },

  getAndSetSteps: function(guide, steps, stepFields, cb) {
    stepFields.each(function(idx, field) {
      var $field = $(field);
      var stepData = {
        stepNum: $field[0].attributes.name.value.split("").pop(),
        content: $field.val(),
        guideId: guide.get('_id'),
        userId: guide.get('userId')
      };
      new Step().createStep(stepData, steps);
      appUtils.clearFields($field);
    });
    cb(steps);
  }

});
