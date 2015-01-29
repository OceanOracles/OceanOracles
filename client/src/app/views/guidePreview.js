window.GuidePreview = Backbone.View.extend({
  className: 'guide-preview-container',
  template: _.template('<div class="guide-inner"><header class="guide-header"><h3 class="guide-title"><%- title %></h3></header><div class="guide-meta"><h5 class="guide-author"></h5><p class="guide-date"><%- createdAt %></p></div><section class="guide-intro"><p class="guide-intro-text"></p></section><section class="steps-container"></section></div>'),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});