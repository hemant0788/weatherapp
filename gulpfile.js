var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cacheBuster = require('gulp-cache-bust');
var cache = require('gulp-cache');
var sass = require('gulp-sass');


gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// cacheBuster looks at the css and js files and appends a hash to the
// request to cause the file to get reloaded when the file changes.
gulp.task('cacheBuster', function () {
    return gulp.src('index.html')
        .pipe(cacheBuster())
        .pipe(gulp.dest('.'));
});

gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

gulp.task('styles', function() {
   return gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['jshint']);
  gulp.watch('js/**/*.js', ['cacheBuster']);
  gulp.watch('js/**/*.js', ['clear']);

});

 

