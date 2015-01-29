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
    var user = new User({username: $formUsername.val(), password: $formPassword.val()});
    var userJSON = {username: $formUsername.val(), password : $formPassword.val()};
    user.login(JSON.stringify(userJSON), this.router);
  }

});
