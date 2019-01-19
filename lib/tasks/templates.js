module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('templates', function () {
    var stream = gulp.src([
      config.source + '/templates/**/*.twig',
      '!' + config.source + '/templates/**/_*.twig'
    ])
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twig({
        errorLogToConsole: true,
        extend: plugins.twigMarkdown,
      }))
      .pipe(helpers.ifNotDev(plugins.htmlMinifier({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
      })))

    return helpers.copyToTargets(stream, 'templates', '/')
  })
}
