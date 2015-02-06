module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  var frontline = grunt.file.readJSON('frontline.json');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourcemap: 'none',
        cacheLocation: frontline.paths.temporary + '/sass',
        style: 'expanded',
        loadPath: [frontline.paths.source + '/styles', 'bower_components']
      },
      dist: {
        expand: true,
        cwd: frontline.paths.source + '/styles',
        src: ['**/*.scss'],
        dest: frontline.paths.frontend + '/styles',
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
        cwd: frontline.paths.frontend + '/styles',
        src: ['**/*.css'],
        dest: frontline.paths.frontend + '/styles'
      }
    },

    svgmin: {
      dist: {
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['{images,media}/**/*.svg'],
        dest: frontline.paths.frontend
      }
    },

    svg2png: {
      dist: {
        src: [frontline.paths.frontend + '/{images,media}/**/*.svg']
      }
    },

    imagemin: {
      dist: {
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['{images,media}/**/*.{png,jpg,gif}'],
        dest: frontline.paths.frontend
      }
    },

    jekyll: {
      options: {
        src : frontline.paths.source + '/templates'
      },
      dist: {
        options: {
          dest: frontline.paths.temporary + '/jekyll'
        }
      }
    },

    concat: { generated: {} },
    uglify: { generated: {} },
    cssmin: { generated: {} },

    useminPrepare: {
      html: {
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['**/*.html']
      },
      options: {
        root: [frontline.paths.source + '/{styles,scripts}', 'bower_components'],
        dest: frontline.paths.frontend
      }
    },

    usemin: {
      html: {
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['**/*.html']
      }
    },

    clean: {
      src: [frontline.paths.frontend + '/*']
    },

    newer: {
      options: {
        cache: frontline.paths.temporary + '/newer'
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: frontline.paths.source,
        src: ['scripts/**/*.js'],
        dest: frontline.paths.frontend
      },
      assets: {
        expand: true,
        cwd: frontline.paths.source,
        src: ['{images,fonts,media}/**/*'],
        dest: frontline.paths.frontend
      },
      templates: {
        expand: true,
        cwd: frontline.paths.temporary + '/jekyll',
        src: ['**/*'],
        dest: frontline.paths.frontend
      }
    },

    watch: {
      styles: {
        options: { dot: true },
        files: [frontline.paths.source + '/styles/**/*.scss'],
        tasks: ['build-styles']
      },
      scripts: {
        options: { dot: true },
        files: [frontline.paths.source + '/scripts/**/*.js'],
        tasks: ['build-scripts']
      },
      assets: {
        options: { dot: true },
        files: [frontline.paths.source + '/{images,fonts,media}/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: [frontline.paths.source + '/templates/**/*'],
        tasks: ['build-templates']
      }
    },

    ftp_push: frontline.ftp_push,

    rsync: frontline.rsync

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
  grunt.registerTask('build', [
    'clean',
    'build-templates',
    'build-scripts',
    'build-styles',
    'build-assets'
  ]);
  grunt.registerTask('default', [
    'watch'
  ]);

};
