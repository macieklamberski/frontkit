module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('deploy', function () {
    if (config.deploy.adapter == 'ftp') {
      config.deploy.log = plugins.util.log
      var connection = plugins.vinylFtp.create(config.deploy);
      return gulp.src(config.deploy.files)
        .pipe(connection.differentSize(config.deploy.destination))
        .pipe(connection.dest(config.deploy.destination));
    } else if (config.deploy.adapter == 'rsync') {
      return gulp.src(config.deploy.files)
        .pipe(plugins.rsync(config.deploy));
    } else {
      plugins.util.log(plugins.util.colors.red('Deployment is not configured.'));
    }
  });
};
