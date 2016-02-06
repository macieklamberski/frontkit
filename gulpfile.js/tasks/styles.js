module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function () {
    var stream = gulp.src(config.source + '/styles/**/*.{css,scss,sass}')
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.sassBulkImport())
      .pipe(plugins.sass({ indentedSyntax: true }))
      .pipe(plugins.importCss())
      .pipe(plugins.autoprefixer())
      .pipe(helpers.ifNotDev(plugins.minifyCss({
        rebase: false,
        keepSpecialComments: 0,
        restructuring: false
      })))
      .pipe(plugins.rename({ suffix: '.min' }));

    return helpers.copyToTargets(stream, 'styles', '/styles');
  });
};
