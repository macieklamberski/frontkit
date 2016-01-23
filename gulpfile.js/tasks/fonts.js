module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('fonts', function () {
    var stream = gulp.src(config.source + '/fonts/**/*')
      .pipe(plugins.plumber(helpers.onError));

    return helpers.copyToTargets(stream, 'fonts', '/fonts');
  });
};
