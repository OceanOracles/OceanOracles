window.utils = {

  loadTemplates: function(views, callback) {
    var deferreds = [];

    $.each(views, function(index, view) {
      if (window[view]) {
        deferreds.push($.get('app/templates/' + view + '.html', function(data) {
          window[view].prototype.template = _.template(data);
        }));
      } else {
        console.log(view + " not found");
      }

    });

    $.when.apply(null, deferreds).done(callback);
  }
};
