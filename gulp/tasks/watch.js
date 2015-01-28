var gulp  = require('gulp');
var config= require('../config');
var browserSync = require('browser-sync');

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.js.src, ['appScripts', 'bsReload']);
  gulp.watch(config.lib.src, ['libScripts', 'bsReload']);
  gulp.watch(config.templates.src, ['templates', 'bsReload']);
  gulp.watch(config.html.src, ['html', 'bsReload']);
});