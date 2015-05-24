module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('media', function () {
    var stream = gulp.src(config.source + '/media/**/*')
      .pipe(plugins.plumber(helpers.onError));

    return helpers.copyToTargets(stream, 'media', '/media');
  });
};
