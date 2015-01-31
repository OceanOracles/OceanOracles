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
    Backbone.history.start();
    return app;
  },

  injectRouter: function(views, router) {
    _.each(views, function(view) {
      window[view].prototype.router = router;
    });
  },

  checkForToken: function() {
    if (window.localStorage.getItem('_user.token')) {
      this.globalNavAuth = new GlobalNavViewAuth();
      appUtils.swapView(this.globalNavAuth, '.main-header-container');
      return true;
    }
    this.globalNav = new GlobalNavView();
    appUtils.swapView(this.globalNav, '.main-header-container');
  },

  swapView: function(view, container) {
    container = container || '.global-container';
    $(container).html(view.el);
  },

  clearFields: function(fields) {
    if (Array.isArray(fields)) {
      _.each(fields, function(field) { field.val(''); });
    } else {
      fields.val('');
    }
  },

  footerFix: function() {
    var $footer = $('.main-footer');

    var footerFixer = function () {
      if (window.innerHeight > $('body').innerHeight()) {
        $footer.addClass('fixed');
      } else {
        $footer.removeClass('fixed');
      }
    };

    footerFixer();

    $(window).on('resize', footerFixer);
  },

  getStepsData: function(fields, model) {
    var steps = [];
    fields.each(function(idx, field) {
      var $field = $(field);
      var stepData = {
        stepNum: $field[0].attributes.name.value.split("").pop(),
        content: $field.val(),
        guideId: model.get('_id'),
        userId: model.get('userId')
      };
      steps.push(stepData);
    });
    return steps;
  }

};
