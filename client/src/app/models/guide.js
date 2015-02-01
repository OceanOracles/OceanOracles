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
      success: function(stepsData) {
        var sortedSteps = _.sortBy(stepsData, 'stepNum');
        cb(sortedSteps);
      },
      error: function(err) {
        console.log(err.status + ' ' + err.statusText);
      }
    });
  },

  updateGuideSteps: function(stepsData, cb) {
    var steps = this.get('steps');
    _.each(steps, function(step, idx) {
      var endpoint = '/api/steps/' + step._id;
      var stepData = stepsData[idx];
      this.updateGuideStep(endpoint, JSON.stringify(stepData));
    }.bind(this));
    cb();
  },

  updateGuideStep: function(endpoint, stepData) {
    $.ajax({
      url: endpoint,
      type: 'PUT',
      beforeSend: function(req) {
        var token = window.localStorage.getItem('_user.token');
        req.setRequestHeader('x-access-token', token);
      },
      contentType: 'application/json',
      data: stepData,
      error: function(err) { console.log(err); }
    });
  },

  updateGuide: function(cb) {
    var endpoint = this.url + '/' + this.get('_id');
    var guideData = JSON.stringify(this.attributes);
    $.ajax({
      url: endpoint,
      type: 'PUT',
      beforeSend: function(req) {
        var token = window.localStorage.getItem('_user.token');
        req.setRequestHeader('x-access-token', token);
      },
      contentType: 'application/json',
      data: guideData,
      success: function() { cb(); },
      error: function(err) { console.log(err); }
    });
  }

});
