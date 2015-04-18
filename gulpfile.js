var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });

gulp.task('clean', function () {
  return gulp.src('static/**/*', { read: false })
    .pipe(plugins.clean());
});

gulp.task('templates', function () {
  return gulp.src(['source/**/*.html', '!source/**/_*.html'])
    .pipe(plugins.twig())
    .pipe(gulp.dest('static'));
});

gulp.task('scripts', function () {
  var minFilter = plugins.filter(['*.min.js']);
  return gulp.src('source/scripts/**/*.js')
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
  return plugins.mergeStream(
    gulp.src('source/media/**/*.{jpg,svg,gif,png}')
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('static/media')),
    gulp.src(['source/media/**/*', '!source/media/**/*.{jpg,svg,gif,png}'])
      .pipe(gulp.dest('static/media'))
  );
});

gulp.task('build', function () {
  return plugins.runSequence('clean', ['scripts', 'styles', 'media']);
});

gulp.task('default', ['scripts', 'styles', 'media'], function () {
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/media/**/*', ['media']);
});
