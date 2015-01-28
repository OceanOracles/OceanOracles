window.SignupView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  events: {
    'submit' : 'saveUser'
  },
  render: function() {
    $(this.el).html(this.template());
    return this;
  },
  saveUser: function(e){
    e && e.preventDefault();
    var $formUsername = this.$el.find('form #username');
    var $formPassword = this.$el.find('form #password');
    var $formEmail = this.$el.find('form #email');

    var user = new User({username: $formUsername.val(), password: $formPassword.val(), email: $formEmail.val()});
    var _this = this;
    user.save(undefined, {url: "/api/users/signup",
      success: function(res){
      window.localStorage.setItem("_token", res.attributes.token);
      _this.router.navigate('/', { trigger: true })
    },
      error: function(){
        console.log("error when trying to login")
      }
    });

  }
});



