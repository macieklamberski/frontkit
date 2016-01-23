module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('images', function () {
    var stream = gulp.src(config.source + '/images/**/*.{jpg,svg,gif,png}')
      .pipe(plugins.plumber(helpers.onError))
      .pipe(helpers.ifNotDev(plugins.imagemin()))

    return helpers.copyToTargets(stream, 'images', '/images');
  });
};
