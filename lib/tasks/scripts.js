module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var stream = gulp.src(config.source + '/scripts/*.js', {read: false})
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.tap(function (file) {
        var b = plugins.browserify(file.path, {debug: true})
          .transform(plugins.vueify)
          .transform(plugins.babelify, {presets: [plugins.babelPresetEs2015]})

        if ( ! helpers.isDev) {
          b.plugin(plugins.minifyify, {map: false})
        }

        file.contents = b.bundle()
      }))
      .pipe(plugins.rename({ suffix: '.min' }))

    return helpers.copyToTargets(stream, 'scripts', '/scripts')
  })
}
