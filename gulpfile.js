var gulp = require('gulp'),
    clean = require('gulp-clean'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

gulp.task('clean', function () {
  return gulp.src('static/**/*', { read: false })
    .pipe(clean());
})

gulp.task('scripts', function () {
  gulp.src('source/scripts/**/*.js')
    .pipe(include())
    .pipe(uglify())
    .pipe(gulp.dest('static/scripts'));
});

gulp.task('styles', function () {
  gulp.src('source/styles/**/*.scss')
    .pipe(include())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('static/styles'));
});

gulp.task('media', function () {
  gulp.src('source/media/**/*.{jpg,svg,gif,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('static/media'));

  gulp.src(['source/media/**/*', '!source/media/**/*.{jpg,svg,gif,png}'])
    .pipe(gulp.dest('static/media'));
});

gulp.task('build', ['scripts', 'styles', 'media']);

gulp.task('default', ['build'], function () {
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/media/**/*', ['media']);
});
