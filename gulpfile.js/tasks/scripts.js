module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var path = require('path');
    var streams = [];
    plugins.glob.sync(config.source + '/scripts/*.js').forEach(function(filePath) {
      streams.push(
        plugins.browserify(filePath)
          .bundle()
          .pipe(plugins.vinylSourceStream(path.basename(filePath)))
          .pipe(plugins.vinylBuffer())
          .pipe(plugins.uglify())
          .pipe(plugins.rename({ suffix: '.min' }))
      );
    });

    return helpers.copyToTargets(plugins.mergeStream(streams), 'scripts', '/scripts');
  });
};
