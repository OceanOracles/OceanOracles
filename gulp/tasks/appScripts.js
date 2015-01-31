var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var config = require('../config').js;

gulp.task('appScripts', function() {
  return gulp.src(config.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});