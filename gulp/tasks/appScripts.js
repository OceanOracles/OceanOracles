var gulp = require('gulp');
var config = require('../config').js;

gulp.task('appScripts', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});