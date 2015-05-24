var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var plugins = require('gulp-load-plugins')({ pattern: '*' });
var config = require('./package.json').config;
var tasks = ['templates', 'scripts', 'styles', 'images', 'sprites', 'fonts', 'media'];

function onError(error) {
  plugins.util.log(plugins.util.colors.red(error.message));
  plugins.util.log(plugins.util.colors.red(error.fileName + ':' + error.lineNumber));
  plugins.util.beep();
  this.emit('end');
};

function copyToTargets(stream, task, directory) {
  config.targets.forEach(function (target) {
    if (target.tasks.indexOf(task) >= 0) {
      stream = stream.pipe(gulp.dest(target.path + directory));
    }
  });
  return stream;
}

gulp.task('clean', function (cb) {
  var directories = [];
  config.targets.forEach(function (target) {
    target.tasks.forEach(function (task) {
      switch (task) {
        case 'templates':
          directories.push(target.path + '/*.html');
        break;
        case 'sprites':
          directories.push(target.path + '/images');
        break;
        default:
          directories.push(target.path + '/' + task);
      }
    });
  });
  plugins.del(directories, { force: true }, cb);
});

gulp.task('templates', function () {
  var stream = gulp.src([
    config.source + '/templates/**/*.html',
    '!' + config.source + '/templates/**/_*.html'
  ])
    .pipe(plugins.plumber(onError))
    .pipe(plugins.twig({ errorLogToConsole: true }))
    .pipe(plugins.jsbeautifier({
      indentSize: 2,
      indentInnerHtml: true,
      unformatted: ['script'],
      maxPreserveNewlines: 1
    }));

  return copyToTargets(stream, 'templates', '/');
});

gulp.task('scripts', function () {
  var streams = [];
  plugins.glob.sync(config.source + '/scripts/*.js').forEach(function(filePath) {
    streams.push(
      plugins.browserify(filePath)
        .bundle()
        .pipe(plugins.vinylSourceStream(path.basename(filePath)))
        .pipe(plugins.vinylBuffer())
        .pipe(plugins.uglify())
        .pipe(plugins.rename({ suffix: '.min' }))
    );
  });

  return copyToTargets(plugins.mergeStream(streams), 'scripts', '/scripts');
});

gulp.task('styles', function () {
  var stream = gulp.src(config.source + '/styles/**/*.{css,scss}')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.cssGlobbing({ extensions: ['.css', '.scss'] }))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.minifyCss({ processImport: true, keepSpecialComments: 0, restructuring: false }))
    .pipe(plugins.rename({ suffix: '.min' }));

  return copyToTargets(stream, 'styles', '/styles');
});

gulp.task('sprites', function () {
  var streams = [];

  plugins.glob.sync(config.source + '/sprites/*').forEach(function(filePath) {
    streams.push(
      gulp.src(filePath + '/*.svg')
        .pipe(plugins.plumber(onError))
        .pipe(plugins.imagemin())
        .pipe(plugins.cheerio({
          run: function ($) { $('[fill]').removeAttr('fill') },
          parserconfig: { xmlMode: true }
        }))
        .pipe(plugins.svgstore())
    );
  });

  return copyToTargets(plugins.mergeStream(streams), 'sprites', '/images');
});

gulp.task('images', function () {
  var stream = gulp.src(config.source + '/images/**/*.{jpg,svg,gif,png}')
    .pipe(plugins.plumber(onError))
    .pipe(plugins.imagemin())

  return copyToTargets(stream, 'images', '/images');
});

gulp.task('fonts', function () {
  var stream = gulp.src(config.source + '/fonts/**/*')
    .pipe(plugins.plumber(onError));

  return copyToTargets(stream, 'fonts', '/fonts');
});

gulp.task('media', function () {
  var stream = gulp.src(config.source + '/media/**/*')
    .pipe(plugins.plumber(onError));

  return copyToTargets(stream, 'media', '/media');
});

gulp.task('build', function () {
  return plugins.runSequence('clean', tasks);
});

gulp.task('watch', function () {
  tasks.forEach(function (task) {
    gulp.watch(config.source + '/' + task + '/**/*', [task]);
  });
});

gulp.task('deploy', function () {
  if (config.deploy.adapter == 'ftp') {
    config.deploy.log = plugins.util.log
    var connection = plugins.vinylFtp.create(config.deploy);
    return gulp.src(config.deploy.files)
      .pipe(connection.differentSize(config.deploy.destination))
      .pipe(connection.dest(config.deploy.destination));
  } else if (config.deploy.adapter == 'rsync') {
    return gulp.src(config.deploy.files)
      .pipe(plugins.rsync(config.deploy));
  } else {
    plugins.util.log(plugins.util.colors.red('Deployment is not configured.'));
  }
});

gulp.task('default', function () {
  return plugins.runSequence('build', 'watch');
});
