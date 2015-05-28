module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('templates', function () {
    var stream = gulp.src([
      config.source + '/templates/**/*.html',
      '!' + config.source + '/templates/**/_*.html'
    ])
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twig({ errorLogToConsole: true }));

    return helpers.copyToTargets(stream, 'templates', '/');
  });
};
