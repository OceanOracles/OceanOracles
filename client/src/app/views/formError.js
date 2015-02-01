window.FormErrorView = Backbone.View.extend({

  template: _.template('<div class="form-error"> <%- text %> </div>'),

  initialize: function(options) {
    this.html = options;
    this.render();
  },

  render: function() {
    $(this.el).html(this.template(this.html));
    return this;
  }

});

