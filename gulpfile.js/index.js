var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });
var config  = require('../package.json').frontkit;
var helpers = require('./helpers')(gulp, plugins, config);

plugins.glob.sync('gulpfile.js/tasks/*').forEach(function (path) {
  path = path.replace('gulpfile.js/', './');
  require(path)(gulp, plugins, config, helpers);
});
