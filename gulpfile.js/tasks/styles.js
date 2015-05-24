module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function () {
    var stream = gulp.src(config.source + '/styles/**/*.{css,scss}')
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.css', '.scss'] }))
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer())
      .pipe(plugins.minifyCss({ processImport: true, keepSpecialComments: 0, restructuring: false }))
      .pipe(plugins.rename({ suffix: '.min' }));

    return helpers.copyToTargets(stream, 'styles', '/styles');
  });
};
