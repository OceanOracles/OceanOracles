/**
 * Override Backbone's sync to pass the JWT token as part of every request to the server
 */

var backboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {

  var token = window.localStorage.getItem('_user.token');

  if (token) {
    options.headers = {
      'x-access-token': token
    }
  }

  return backboneSync.apply(this, [method, model, options]);
};
