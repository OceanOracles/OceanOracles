window.LoginView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'submit' : 'loginUser'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  loginUser: function(e){
    e && e.preventDefault();
    var userData = {
      username: this.$el.find('form .username').val(),
      password: this.$el.find('form .password').val()
    };
    new User(userData).login(JSON.stringify(userData), this.router);
  }

});
