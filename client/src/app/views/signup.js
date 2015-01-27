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
    console.log(e);
    console.log(this);
    console.log($formUsername);

    var user = new User({username: $formUsername.val(), password: $formPassword.val(), email: $formEmail.val()});
    console.log("model object", user);
    user.save();
    console.log("model id", user.id);
    $formUsername.val('');
    $formPassword.val('');
    $formEmail.val('');
  }
});



