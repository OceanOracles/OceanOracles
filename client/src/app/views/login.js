window.LoginView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  events: {
    'submit' : 'loginUser'
  },
  render: function() {
    $(this.el).html(this.template());
    return this;
  },

  loginUser: function(e){
    e && e.preventDefault();
    var $formUsername = this.$el.find('form .username');
    var $formPassword = this.$el.find('form .password');
    var user = new User({username: $formUsername.val(), password: $formPassword.val()})
    var that = this;
    user.fetch({url: "/api/users/login",
      success: function(){
        window.localStorage.currentUser = res.attributes.token;
        that.router.navigate('/', { trigger: true })
      },
      error: function(err){
        console.log(err);
        console.log("error when trying to login")
      }
    })
  }

});
