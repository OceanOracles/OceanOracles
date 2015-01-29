var backboneSync = Backbone.sync

Backbone.sync = function (method, model, options) {

  var token = window.localStorage.getItem('_user.token');

  if (token) {
    options.headers = {
      'x-access-token': token
    }
  }

  backboneSync(method, model, options);
};
