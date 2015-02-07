module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  var frontline = grunt.file.readJSON('frontline.json');
  var wordpress = function (options) {
    return frontline.paths.wordpress ? options : {};
  };

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        sourcemap: 'none',
        cacheLocation: frontline.paths.temporary + '/sass',
        style: 'expanded',
        loadPath: [frontline.paths.source + '/styles', 'bower_components']
      },
      frontend: {
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
      frontend: {
        expand: true,
        cwd: frontline.paths.frontend + '/styles',
        src: ['**/*.css'],
        dest: frontline.paths.frontend + '/styles'
      }
    },

    svgmin: {
      frontend: {
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['{images,media}/**/*.svg'],
        dest: frontline.paths.frontend
      }
    },

    svg2png: {
      frontend: {
        src: [frontline.paths.frontend + '/{images,media}/**/*.svg']
      }
    },

    imagemin: {
      frontend: {
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
      frontend: {
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
      frontend: {
        src: [frontline.paths.frontend + '/*']
      },
      wordpress: wordpress({
        src: [frontline.paths.wordpress + '/{images,fonts,styles,scripts}']
      })
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
      },
      wordpress: wordpress({
        expand: true,
        cwd: frontline.paths.frontend,
        src: ['{images,fonts,styles,scripts}/**/*'],
        dest: frontline.paths.wordpress
      })
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
    'autoprefixer',
    'build-wordpress'
  ]);
  grunt.registerTask('build-scripts', [
    'newer:copy:scripts',
    'build-wordpress'
  ]);
  grunt.registerTask('build-assets', [
    'newer:copy:assets',
    'newer:svgmin',
    'newer:svg2png',
    'newer:imagemin',
    'build-wordpress'
  ]);
  grunt.registerTask('build-templates', [
    'jekyll:frontend',
    'newer:copy:templates',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'usemin',
    'build-wordpress'
  ]);
  grunt.registerTask('build-wordpress', [
    'copy:wordpress'
  ]);
  grunt.registerTask('build', [
    'clean',
    'build-templates',
    'build-scripts',
    'build-styles',
    'build-assets',
    'build-wordpress'
  ]);
  grunt.registerTask('default', [
    'watch'
  ]);

};
