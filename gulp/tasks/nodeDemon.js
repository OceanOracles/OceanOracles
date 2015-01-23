var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../config.js').nodeDemon;

gulp.task('nodeDemon', function() {
  nodemon(config);
});