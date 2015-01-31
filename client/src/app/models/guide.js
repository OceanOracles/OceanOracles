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
  },

  getGuideSteps: function(cb) {
    var endpoint = this.url + '/' + this.get('_id') + '/steps';
    $.ajax({
      url: endpoint,
      type: 'GET',
      success: function(stepsData) { cb(stepsData); },
      error: function(err) {
        console.log(err.status + ' ' + err.statusText);
      }
    });
  }

});
