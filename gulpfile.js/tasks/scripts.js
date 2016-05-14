module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var stream = gulp.src(config.source + '/scripts/*.js', {read: false})
      .pipe(plugins.tap(function (file) {
        file.contents = plugins.browserify(file.path, {
          debug: true,
          transform: [plugins.es6ify]
        })
        .bundle();
      }))
      .pipe(plugins.buffer())
      .pipe(helpers.ifNotDev(plugins.uglify()))
      .pipe(plugins.rename({ suffix: '.min' }));

    return helpers.copyToTargets(stream, 'scripts', '/scripts');
  });
};
