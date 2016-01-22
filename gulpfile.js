var gulp = require('gulp');
var jasmine = require('gulp-jasmine-node');

gulp.task('watch', function () {
  gulp.watch([
   ' app/**/*.js',
    '/configs/*.js',
    'spec/**/*.js'
    
  ]);
});



gulp.task('run-test', function() {
  return gulp.src(['spec/**/*spec.js']).pipe(jasmine({
    timeout: 10000,
    showColors: true,
    verbose: true,
    captionExceptions: true
  }));
});


gulp.task('default', ['run-test', 'watch'], function() {
  gulp.start('watch');
});

module.exports = gulp;
