window.User = Backbone.Model.extend({

  defaults: {
    username: '',
    password: '',
    email: ''
  },

  login: function(user, router) {
    $.ajax({
      url: '/api/users/login',
      type: 'POST',
      data: user,
      contentType: 'application/json',
      success: function(data) {
        window.localStorage.setItem('_user.token', data.token);
        window.localStorage.setItem('_user.Id', data.userId);
        router.navigate('/', { trigger: true });
      },
      error: function(err) {
        console.log(err.status + ' ' + err.statusText);
        var options = {
          text: 'Error: Incorrect username or password. Please try again.'
        };
        this.formErrorView = new FormErrorView(options);
        $('.error-form-container').html(this.formErrorView.el);
      }
    });
  },

  signup: function(router) {
    this.save(undefined, {
      url: '/api/users/signup',
      success: function(data) {
        window.localStorage.setItem('_user.token', data.attributes.token);
        window.localStorage.setItem('_user.Id', data.attributes.userId);
        router.navigate('/', { trigger: true });
      },
      error: function() {
        console.log('User signup error');
        var options = {
          text: 'Error: Username or email is already taken. Please try again.'
        };
        this.formErrorView = new FormErrorView(options);
        $('.error-form-container').html(this.formErrorView.el);
      }
    });
  }

});
