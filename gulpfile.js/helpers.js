module.exports = function (gulp, plugins, config) {
  return {
    ifNotDev: function (action) {
      return plugins.yargs.argv['dev'] !== undefined
        ? plugins.util.noop()
        : action;
    },
    onError: function (error) {
      plugins.util.log(plugins.util.colors.red(error.message));
      plugins.util.log(plugins.util.colors.red(error.fileName + ':' + error.lineNumber));
      plugins.util.beep();
      this.emit('end');
    },
    copyToTargets: function (stream, task, directory) {
      config.targets.forEach(function (target) {
        if (target.tasks.indexOf(task) >= 0) {
          stream = stream.pipe(gulp.dest(target.path + directory));
        }
      });
      return stream;
    }
  }
};
