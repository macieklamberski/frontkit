module.exports = function (gulp, plugins, config, helpers) {
  var tasks = ['templates', 'scripts', 'styles', 'images', 'icons', 'sprites', 'files']

  gulp.task('build', ['clean'], function () {
    var runSequence = plugins.runSequence.use(gulp)
    return runSequence(tasks)
  })

  gulp.task('watch', function () {
    tasks.forEach(function (task) {
      gulp.watch(config.source + '/' + task + '/**/*', [task])
    })
  })

  gulp.task('default', function () {
    var runSequence = plugins.runSequence.use(gulp)
    return runSequence('build', 'watch')
  })
}
