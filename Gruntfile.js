module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  var config = grunt.file.readJSON('frontline.json');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      src: [config.paths.frontend + '/*']
    },

    newer: {
      options: {
        cache: config.paths.temporary + '/newer'
      }
    },

    sass: {
      options: {
        sourcemap: 'none',
        cacheLocation: config.paths.temporary + '/sass',
        style: 'expanded',
        loadPath: [config.paths.source + '/styles', 'bower_components']
      },
      dist: {
        expand: true,
        cwd: config.paths.source + '/styles',
        src: ['**/*.scss'],
        dest: config.paths.frontend + '/styles',
        ext: '.css'
      }
    },

    autoprefixer: {
      options: {
        cascade: false,
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        expand: true,
        cwd: config.paths.frontend + '/styles',
        src: ['**/*.css'],
        dest: config.paths.frontend + '/styles'
      }
    },

    svgmin: {
      dist: {
        expand: true,
        cwd: config.paths.frontend,
        src: ['{images,media}/**/*.svg'],
        dest: config.paths.frontend
      }
    },

    svg2png: {
      dist: {
        src: [config.paths.frontend + '/{images,media}/**/*.svg']
      }
    },

    imagemin: {
      dist: {
        expand: true,
        cwd: config.paths.frontend,
        src: ['{images,media}/**/*.{png,jpg,gif}'],
        dest: config.paths.frontend
      }
    },

    jekyll: {
      options: {
        src : config.paths.source + '/templates'
      },
      dist: {
        options: {
          dest: config.paths.temporary + '/jekyll'
        }
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: config.paths.source,
        src: ['scripts/**/*.js'],
        dest: config.paths.frontend
      },
      assets: {
        expand: true,
        cwd: config.paths.source,
        src: ['{images,fonts,media}/**/*'],
        dest: config.paths.frontend
      },
      templates: {
        expand: true,
        cwd: config.paths.temporary + '/jekyll',
        src: ['**/*'],
        dest: config.paths.frontend
      },
      other: {
        expand: true,
        cwd: config.paths.source,
        src: ['*/**/*', '!{fonts,images,media,scripts,styles,templates}/**/*'],
        dest: config.paths.frontend
      }
    },

    concat: { generated: {} },
    uglify: { generated: {} },
    cssmin: { generated: {} },

    useminPrepare: {
      html: {
        expand: true,
        cwd: config.paths.frontend,
        src: ['**/*.html']
      },
      options: {
        root: [config.paths.source + '/{styles,scripts}', 'bower_components'],
        dest: config.paths.frontend
      }
    },

    usemin: {
      html: {
        expand: true,
        cwd: config.paths.frontend,
        src: ['**/*.html']
      }
    },

    watch: {
      styles: {
        options: { dot: true },
        files: [config.paths.source + '/styles/**/*.scss'],
        tasks: ['build-styles']
      },
      scripts: {
        options: { dot: true },
        files: [config.paths.source + '/scripts/**/*.js'],
        tasks: ['build-scripts']
      },
      assets: {
        options: { dot: true },
        files: [config.paths.source + '/{images,fonts,media}/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: [config.paths.source + '/templates/**/*'],
        tasks: ['build-templates']
      },
      other: {
        files: [
          config.paths.source + '/**/*',
          '!' + config.paths.source + '/{fonts,images,media,scripts,styles,templates}/*'
        ],
        tasks: ['build-other']
      }
    },

    ftp_push: config.ftp_push,

    rsync: config.rsync

  });

  grunt.registerTask('build-styles', [
    'sass',
    'autoprefixer'
  ]);
  grunt.registerTask('build-scripts', [
    'newer:copy:scripts'
  ]);
  grunt.registerTask('build-assets', [
    'newer:copy:assets',
    'newer:svgmin',
    'newer:svg2png',
    'newer:imagemin'
  ]);
  grunt.registerTask('build-templates', [
    'jekyll:dist',
    'newer:copy:templates',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin'
  ]);
  grunt.registerTask('build-other', [
    'newer:copy:other'
  ]);
  grunt.registerTask('build', [
    'clean',
    'build-templates',
    'build-scripts',
    'build-styles',
    'build-assets',
    'build-other'
  ]);
  grunt.registerTask('default', [
    'watch'
  ]);

};
