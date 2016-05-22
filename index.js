module.exports = function (config) {
  var gulp    = require('gulp')
  var plugins = require('gulp-load-plugins')({ pattern: '*' })
  var helpers = require(__dirname + '/lib/helpers')(gulp, plugins, config)
  var tasks   = require('require-dir')(__dirname + '/lib/tasks')

  Object.keys(tasks).forEach(function (task) {
    tasks[task](gulp, plugins, config, helpers)
  })
}
