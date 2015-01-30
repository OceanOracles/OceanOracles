window.Step = Backbone.Model.extend({

  urlRoot: '/api/steps',

  defaults: { content: "" },

  createStep: function(stepData, steps) {
    this.save(stepData, {
      success: function(step) {
        steps.push(step);
      },
      error: function(step, res) { console.log("error", step, res); }
    });
  }

});
