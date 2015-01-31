window.Guide = Backbone.Model.extend({

  url: '/api/guides',

  defaults: {
    title: ""
  },

  createGuide: function(guideData) {
    this.save(guideData, {
      success: function(model) { model.trigger('created', model); },
      error: function(model, res) { console.log("error", model, res); }
    });
  }

});
