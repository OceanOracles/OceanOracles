window.User = Backbone.Model.extend({

  defaults: {
    username: "",
    password: "",
    email: "testemail@gmail.com"
  },

  initialize: function(){
    console.log("A new user object with username " + this.get('username') + "has been created.");
    // this.checkForToken();
  }

  // checkForToken: function(){
  //   window.localStorage._token !== undefined ? this.trigger('tokenAccess', this) : this.trigger('noToken', this)
  // }


});
