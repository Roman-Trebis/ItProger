const gulp = require('gulp'),
  minifyCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass')(require('sass')),
  minifyJS = require('gulp-minify'),
  browserSync = require('browser-sync').create();

gulp.task('minCss', function() {
  return gulp.src('app/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('minJs', function() {
  return gulp.src('app/js/main.js')
    .pipe(minifyJS())
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('watchAll', function() {
  gulp.watch('app/css/*.scss', gulp.series('minCss'));
  gulp.watch('app/js/*.js', gulp.series('minJs'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: 'public/'
  });

  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('minCss', 'minJs'));

gulp.task('default', gulp.parallel('browserSync', 'watchAll'));
