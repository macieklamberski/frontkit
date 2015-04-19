var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });

var onError = function (error) {
  plugins.util.log(plugins.util.colors.red(error.message));
  plugins.util.log(plugins.util.colors.red(error.fileName + ':' + error.lineNumber));
  plugins.util.beep();
  this.emit('end');
};

gulp.task('clean', function () {
  return gulp.src('preview/**/*', { read: false })
    .pipe(plugins.clean());
});

gulp.task('templates', function () {
  return gulp.src(['source/**/*.html', '!source/**/_*.html'])
    .pipe(plugins.plumber(onError))
    .pipe(plugins.twig())
    .pipe(gulp.dest('preview'));
});

gulp.task('scripts', function () {
  var minFilter = plugins.filter(['*.min.js']);
  return gulp.src('source/scripts/**/*.js')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.changed('preview/scripts'))
    .pipe(plugins.include())
    .pipe(minFilter)
    .pipe(plugins.uglify())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview/scripts'));
});

gulp.task('styles', function () {
  var minFilter = plugins.filter(['*.min.{css,scss}']);
  return gulp.src('source/styles/**/*.{css,scss}')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.include())
    .pipe(plugins.sass())
    .pipe(plugins.cssbeautify({ indent: '  ', autosemicolon: true }))
    .pipe(plugins.replace(';\n/*', ';\n\n/*'))
    .pipe(plugins.replace('*/\n', '*/\n\n'))
    .pipe(plugins.replace('"', '\''))
    .pipe(plugins.autoprefixer())
    .pipe(minFilter)
    .pipe(plugins.minifyCss())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview/styles'));
});

gulp.task('media', function () {
  var minFilter = plugins.filter(['*.{jpg,svg,gif,png}']);
  return gulp.src(['source/**/*', '!source/{scripts,styles}/**/*', '!source/**/*.html'])
    .pipe(plugins.plumber(onError))
    .pipe(plugins.changed('preview'))
    .pipe(minFilter)
    .pipe(plugins.imagemin())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview'));
});

gulp.task('build', function () {
  return plugins.runSequence('clean', ['templates', 'scripts', 'styles', 'media']);
});

gulp.task('watch', function () {
  gulp.watch('source/**/*.html', ['templates']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/media/**/*', ['media']);
});

gulp.task('default', ['build', 'watch']);
