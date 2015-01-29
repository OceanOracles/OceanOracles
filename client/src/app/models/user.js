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

  login: function(JSONdata, router){
    $.ajax({
      url: "/api/users/login",
      type: "POST",
      data: JSONdata,
      contentType: "application/json"
    }).done(function(data){
      var parsedUsername = JSON.parse(JSONdata).username;
      window.localStorage.setItem("_user.token", data.token);
      window.localStorage.setItem("_user.name", parsedUsername);
      router.navigate('/', { trigger: true })
    })
  },

  signup: function(router){
    this.save(undefined, {url: "/api/users/signup",
      success: function(res){
      window.localStorage.setItem("_user.token", res.attributes.token);
      window.localStorage.setItem("_user.name", res.attributes.username);
      router.navigate('/', { trigger: true })
    },
      error: function(){
        console.log("error when trying to login")
      }
    });
  },



  // checkForToken: function(){
  //   window.localStorage._token !== undefined ? this.trigger('tokenAccess', this) : this.trigger('noToken', this)
  // }


});
