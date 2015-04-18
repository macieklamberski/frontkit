var gulp = require('gulp'),
    mergeStream = require('merge-stream'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    filter = require('gulp-filter'),
    include = require('gulp-include'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

gulp.task('clean', function () {
  return gulp.src('static/**/*', { read: false })
    .pipe(clean());
});

gulp.task('scripts', function () {
  var minFilter = filter(['*.min.js']);
  return gulp.src('source/scripts/**/*.js')
    .pipe(include())
    .pipe(minFilter)
    .pipe(uglify())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('static/scripts'));
});

gulp.task('styles', function () {
  var minFilter = filter(['*.min.{css,scss}']);
  return gulp.src('source/styles/**/*.{css,scss}')
    .pipe(include())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minFilter)
    .pipe(minifyCSS())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('static/styles'));
});

gulp.task('media', function () {
  return mergeStream(
    gulp.src('source/media/**/*.{jpg,svg,gif,png}')
      .pipe(imagemin())
      .pipe(gulp.dest('static/media')),
    gulp.src(['source/media/**/*', '!source/media/**/*.{jpg,svg,gif,png}'])
      .pipe(gulp.dest('static/media'))
  );
});

gulp.task('build', function () {
  return runSequence('clean', ['scripts', 'styles', 'media']);
});

gulp.task('default', ['scripts', 'styles', 'media'], function () {
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/media/**/*', ['media']);
});
