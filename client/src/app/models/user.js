window.User = Backbone.Model.extend({

  defaults: {
    username: "",
    password: "",
    email: "testemail@gmail.com"
  },

  initialize: function(){
    console.log("A new user object with username " + this.get('username') + "has been created.")
  }


});
