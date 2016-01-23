module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var stream = gulp.src(config.source + '/scripts/*.js')
      .pipe(plugins.include())
      .pipe(helpers.ifNotDev(plugins.uglify()))
      .pipe(plugins.rename({ suffix: '.min' }));

    return helpers.copyToTargets(stream, 'scripts', '/scripts');
  });
};
