window.User = Backbone.Model.extend({

  defaults: {
    username: "",
    password: "",
    email: "testemail@gmail.com"
  },

  initialize: function(){
    console.log("A new user object with username " + this.get('username') + "has been created.");
    // this.checkForToken();
  },



  signup: function(router){
    this.save(undefined, {url: "/api/users/signup",
      success: function(res){
      window.localStorage.setItem("_token", res.attributes.token);
      router.navigate('/', { trigger: true })
    },
      error: function(){
        console.log("error when trying to login")
      }
    });
  }

  // checkForToken: function(){
  //   window.localStorage._token !== undefined ? this.trigger('tokenAccess', this) : this.trigger('noToken', this)
  // }


});
