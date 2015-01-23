var gulp = require('gulp');

gulp.task('build', ['sass', 'appScripts', 'libScripts', 'templates', 'html']);