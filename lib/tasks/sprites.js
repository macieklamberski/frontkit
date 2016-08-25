module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('sprites', function () {
    var streams = []

    plugins.glob.sync(config.source + '/sprites/*').forEach(function(filePath) {
      streams.push(
        gulp.src(filePath + '/*.svg')
          .pipe(plugins.plumber(helpers.onError))
          .pipe(helpers.ifNotDev(plugins.imagemin()))
          .pipe(plugins.svgstore())
      )
    })

    return helpers.copyToTargets(plugins.mergeStream(streams), 'sprites', '/images')
  })
}
