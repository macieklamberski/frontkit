module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('files', function () {
    var stream = gulp.src(config.source + '/files/**/*', {dot: true})
      .pipe(plugins.plumber(helpers.onError))

    return helpers.copyToTargets(stream, 'files', '/')
  })
}
