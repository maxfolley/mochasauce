var gulp = require('gulp');
var parallel = require('./parallel');

gulp.task('test-browsers', function () {
  parallel.test([
    {browserName: 'chrome'},
    {browserName: 'internet explorer'},
    {browserName: 'firefox'}
  ]);
});
