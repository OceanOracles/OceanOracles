window.templateUtils = utils = {

  loadTemplates: function(views, cb) {
    var tasks = [];
    utils.queueJobs(views, tasks);
    $.when.apply(null, tasks).done(cb);
  },

  queueJobs: function(views, tasks) {
    _.each(views, function(view) { utils.setTasks(view, tasks) });
  },

  setTasks: function(view, tasks) {
    if (window[view]) {
      tasks.push(utils.tempify(view, utils.getView(view)));
    } else {
      utils.log(view);
    }
  },

  tempify: function(view, temp) {
    return utils.getTemplate(temp, function(data) {
      utils.setTemplate(view, data);
    });
  },

  log: function(view) {
    console.log(view + " not found");
  },

  getView: function(view) {
    return 'app/templates/' + view + '.html';
  },

  getTemplate: function(temp, cb) {
    return $.get(temp, cb);
  },

  setTemplate: function(view, temp) {
    window[view].prototype.template = _.template(temp);
  }

};

window.appUtils = {

  startRouter: function(router) {
    var app = new router();
    Backbone.history.start({ pushState: true });
    return app;
  },

  injectRouter: function(views, router) {
    _.each(views, function(view) {
      window[view].prototype.router = router;
    });
  }

};

