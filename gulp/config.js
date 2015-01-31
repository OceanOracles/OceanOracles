var dest = './client/public';
var src = './client/src';

module.exports = {
  browserSync: {
    proxy: "http://localhost:8000"
  },
  sass: {
    src: src + '/assets/styles/**/{*.scss, _*.scss}',
    dest: dest + '/assets/styles'
  },
  nodeDemon: {
    script: 'app.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./gulp/**/*', './node_modules/**/*'],
    watch: ['./server/**/*.js', './client/**/*.js']
  },
  js: {
    src: [
      src + '/app/auth.js',
      src + '/app/models/user.js',
      src + '/app/models/step.js',
      src + '/app/models/guide.js',
      src + '/app/collections/guides.js',
      src + '/app/utils.js',
      src + '/app/views/globalNav.js',
      src + '/app/views/globalNavAuth.js',
      src + '/app/views/guideListItem.js',
      src + '/app/views/guideList.js',
      src + '/app/views/guide.js',
      src + '/app/views/guideAuth.js',
      src + '/app/views/home.js',
      src + '/app/views/signup.js',
      src + '/app/views/formError.js',
      src + '/app/views/login.js',
      src + '/app/views/guideCreate.js',
      src + '/app/views/guideUpdate.js',
      src + '/app/views/notFound.js',
      src + '/app/main.js'
    ],
    dest: dest + '/app'
  },
  templates: {
    src: src + '/app/templates/**/*.html',
    dest: dest + '/app/templates'
  },
  lib: {
    src: [
      src + '/lib/jquery/dist/jquery.js',
      src + '/lib/underscore/underscore.js',
      src + '/lib/backbone/backbone.js',
      src + '/lib/handlebars/handlebars.js'
    ],
    dest: dest + '/lib'
  },
  html: {
    src: src + '/index.html',
    dest: dest + '/'
  }
};