var gulp = require('gulp');
var clean = require('gulp-clean');
var include = require('gulp-include');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

gulp.task('clean', function () {
  return gulp.src('static/**/*', {read: false})
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
    .pipe(gulp.dest('static/styles'));
});

gulp.task('images', function () {
  gulp.src('source/{media,images}/**/*.{jpg,svg,gif,png}', {base: 'source'})
    .pipe(imagemin())
    .pipe(gulp.dest('static'));
});

gulp.task('build', ['scripts', 'styles', 'images']);

gulp.task('default', ['build'], function () {
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/images/**/*', ['images']);
});
