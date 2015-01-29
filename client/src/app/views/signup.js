window.SignupView = Backbone.View.extend({

  initialize: function() {
    this.render();
  },

  events: {
    'submit' : 'saveUser'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  saveUser: function(e){
    e && e.preventDefault();
    var userData = {
      username: this.$el.find('form #username').val(),
      password: this.$el.find('form #password').val(),
      email: this.$el.find('form #email').val()
    };
    new User(userData).signup(this.router);
  }

});
