var gulp  = require('gulp');
var config= require('../config');
var browserSync = require('browser-sync');

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.src)
});