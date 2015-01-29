window.GuidesView = Backbone.View.extend({
  initialize: function(options) {
    this.preview = options.preview;
    this.render();
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },
  render: function() {
    $(this.el).html(this.template());
    return this;
  },
  addAll: function() {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(guide) {
    var guideView;
    if (this.preview) {
      guideView = new GuidePreview({ model: guide });
    } else {
      guideView = new GuideView({ model: guide });
    }
    this.$el.append(guideView.render().el);
  }
});
