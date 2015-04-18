var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });

gulp.task('clean', function () {
  return gulp.src('static/**/*', { read: false })
    .pipe(plugins.clean());
});

gulp.task('templates', function () {
  return gulp.src(['source/**/*.html', '!source/**/_*.html'])
    .pipe(plugins.changed('static'))
    .pipe(plugins.twig())
    .pipe(gulp.dest('static'));
});

gulp.task('scripts', function () {
  var minFilter = plugins.filter(['*.min.js']);
  return gulp.src('source/scripts/**/*.js')
    .pipe(plugins.changed('static/scripts'))
    .pipe(plugins.include())
    .pipe(minFilter)
    .pipe(plugins.uglify())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('static/scripts'));
});

gulp.task('styles', function () {
  var minFilter = plugins.filter(['*.min.{css,scss}']);
  return gulp.src('source/styles/**/*.{css,scss}')
    .pipe(plugins.include())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(minFilter)
    .pipe(plugins.minifyCss())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('static/styles'));
});

gulp.task('media', function () {
  var minFilter = plugins.filter(['*.{jpg,svg,gif,png}']);
  return gulp.src('source/media/**/*')
    .pipe(plugins.changed('static/media'))
    .pipe(minFilter)
    .pipe(plugins.imagemin())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('static/media'));
});

gulp.task('build', function () {
  return plugins.runSequence('clean', ['templates', 'scripts', 'styles', 'media']);
});

gulp.task('watch', function () {
  gulp.watch('source/*.html', ['templates']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/media/**/*', ['media']);
});

gulp.task('default', ['build', 'watch']);
