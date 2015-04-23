var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });
var options = require('./options.json');
var onError = function (error) {
  plugins.util.log(plugins.util.colors.red(error.message));
  plugins.util.log(plugins.util.colors.red(error.fileName + ':' + error.lineNumber));
  plugins.util.beep();
  this.emit('end');
};

gulp.task('clean', function () {
  return plugins.del(['preview', options.theme + '/{fonts,images,scripts,styles}']);
});

gulp.task('templates', function () {
  return gulp.src(['source/**/*.html', '!source/**/_*.html'])
    .pipe(plugins.plumber(onError))
    .pipe(plugins.twig({ errorLogToConsole: true }))
    .pipe(plugins.jsbeautifier({ indentSize: 2, indentInnerHtml: true, maxPreserveNewlines: 1 }))
    .pipe(gulp.dest('preview'));
});

gulp.task('scripts', function () {
  var minFilter = plugins.filter('*.min.js');
  var beautifyFilter = plugins.filter(['*.js', '!*.min.js']);
  return gulp.src('source/scripts/**/*.js')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.changed('preview/scripts'))
    .pipe(plugins.include())
    .pipe(beautifyFilter)
      .pipe(plugins.jsbeautifier({ indentSize: 2, space_after_anon_function: true }))
    .pipe(beautifyFilter.restore())
    .pipe(minFilter)
      .pipe(plugins.uglify())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview/scripts'));
});

gulp.task('styles', function () {
  var minFilter = plugins.filter('*.min.{css,scss}');
  var beautifyFilter = plugins.filter(['*.{css,scss}', '*.min.{css,scss}']);
  return gulp.src('source/styles/**/*.{css,scss}')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.include())
    .pipe(plugins.sass())
    .pipe(beautifyFilter)
      .pipe(plugins.jsbeautifier({ indentSize: 2 }))
      .pipe(plugins.replace(';\n/*', ';\n\n/*'))
      .pipe(plugins.replace('}\n/*', '}\n\n/*'))
      .pipe(plugins.replace('*/\n/*', '*/\n\n/*'))
      .pipe(plugins.replace('"', '\''))
    .pipe(beautifyFilter.restore())
    .pipe(plugins.autoprefixer())
    .pipe(minFilter)
      .pipe(plugins.minifyCss())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview/styles'));
});

gulp.task('media', function () {
  var minFilter = plugins.filter('**/*.{jpg,svg,gif,png}');
  return gulp.src(['source/{fonts,images,media}/**/*'])
    .pipe(plugins.plumber(onError))
    .pipe(plugins.changed('preview'))
    .pipe(minFilter)
      .pipe(plugins.imagemin())
    .pipe(minFilter.restore())
    .pipe(gulp.dest('preview'));
});

gulp.task('other', function () {
  return gulp.src([
    'source/**/*',
    '!source/{fonts,images,scripts,styles,media}',
    '!source/{fonts,images,scripts,styles,media}/**/*',
    '!source/**/*.html'
  ])
    .pipe(plugins.changed('preview'))
    .pipe(gulp.dest('preview'));
});

gulp.task('theme', function () {
  return options.theme && gulp.src('preview/{fonts,images,scripts,styles}/**/*')
    .pipe(gulp.dest(options.theme));
});

gulp.task('build', function () {
  return plugins.runSequence('clean', ['templates', 'scripts', 'styles', 'media', 'other'], 'theme');
});

gulp.task('watch', function () {
  gulp.watch('source/**/*.html', ['templates']);
  gulp.watch('source/scripts/**/*', ['scripts']);
  gulp.watch('source/styles/**/*', ['styles']);
  gulp.watch('source/{fonts,images,media}/**/*', ['media']);
  gulp.watch('source/**/*', ['other']);
});

gulp.task('deploy', function () {
  if (options.deploy.adapter == 'ftp') {
    options.deploy.log = plugins.util.log
    var connection = plugins.vinylFtp.create(options.deploy);
    return gulp.src(options.deploy.local + '/**/*')
      .pipe(connection.newerOrDifferentSize(options.deploy.remote))
      .pipe(connection.dest(options.deploy.remote));
  } else if (options.deploy.adapter == 'rsync') {
    return gulp.src(options.deploy.root + '/**/*')
      .pipe(plugins.rsync(options.deploy));
  } else {
    plugins.util.log(plugins.util.colors.red('Deployment is not configured.'));
  }
});

gulp.task('default', function () {
  return plugins.runSequence('build', 'watch');
});
