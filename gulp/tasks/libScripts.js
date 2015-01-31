var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var config = require('../config').lib;

gulp.task('libScripts', function() {
  return gulp.src(config.src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});