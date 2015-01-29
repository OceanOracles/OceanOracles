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
    var userData = {
      username: $formUsername.val(),
      password: $formPassword.val()
    };
    new User(userData).login(JSON.stringify(userData), this.router);
  }

});
