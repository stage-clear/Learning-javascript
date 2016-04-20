

const gulp = require('gulp');
const browser = require('browser-sync');

gulp.task('server', done => {
  return browser.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    startPath: '/routing/index.html' 
  }) && done();
});