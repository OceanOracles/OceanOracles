window.Guides = Backbone.Collection.extend({

  url: '/api/guides',

  model: Guide,

  deleteGuide: function(model, cb) {
    var endpoint = this.url + '/' + model.get('_id');
    this.remove(model);
    $.ajax({
      url: endpoint,
      type: 'DELETE',
      beforeSend: function(req) {
        var token = window.localStorage.getItem('_user.token');
        req.setRequestHeader('x-access-token', token);
      },
      success: function() { cb(); },
      error: function(err) { console.log(err); }
    });
  }

});
