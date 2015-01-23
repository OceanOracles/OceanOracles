var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../helpers/errorHandler');
var config = require('../config').sass;
var browserSync = require('browser-sync');


gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sass({
      style: 'compressed',
      sourcemap: false
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});