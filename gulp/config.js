var dest = './client/public';
var src = './client/src';

module.exports = {
  browserSync: {
    proxy: "http://localhost:8000"
  },
  sass: {
    src: src + '/styles/**/{*.scss, _*.scss}',
    dest: dest + '/styles'
  },
  nodeDemon: {
    script: 'app.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./gulp/**/*', './node_modules/**/*'],
    watch: ['./server/**/*.js', './client/**/*.js']
  },
  js: {
    src: src + '/app/**/*.js',
    dest: dest + '/app'
  },
  templates: {
    src: src + '/app/templates/**/*.html',
    dest: dest + '/app/templates'
  },
  lib: {
    src: src + '/lib/**/*.js',
    dest: dest + '/lib'
  },
  html: {
    src: src + '/index.html',
    dest: dest + '/'
  }
};