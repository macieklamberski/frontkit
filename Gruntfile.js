module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      styles: {
        src: ['dist/styles']
      },
      scripts: {
        src: ['dist/scripts']
      },
      assets: {
        src: ['dist/{images,fonts,media}']
      },
      templates: {
        src: ['dist/*.html']
      }
    },

    sass: {
      options: {
        cacheLocation: '.tmp/sass',
        style: 'expanded',
        loadPath: ['src/styles', 'bower_components']
      },
      dist: {
        expand: true,
        cwd: 'src/styles',
        src: ['**/*.scss'],
        dest: 'dist/styles',
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
        cwd: 'dist/styles',
        src: ['**/*.css'],
        dest: 'dist/styles'
      }
    },

    svgmin: {
      dist: {
        expand: true,
        cwd: 'dist',
        src: ['{images,media}/**/*.svg'],
        dest: 'dist'
      }
    },

    svg2png: {
      dist: {
        src: ['dist/{images,media}/**/*.svg']
      }
    },

    imagemin: {
      dist: {
        expand: true,
        cwd: 'dist',
        src: ['{images,media}/**/*.{png,jpg,gif}'],
        dest: 'dist'
      }
    },

    jekyll: {
      options: {
        src : 'src/templates'
      },
      dist: {
        options: {
          dest: '.tmp/jekyll'
        }
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: 'src',
        src: ['scripts/**/*.js'],
        dest: 'dist'
      },
      assets: {
        expand: true,
        cwd: 'src',
        src: ['{images,fonts,media}/**/*'],
        dest: 'dist'
      },
      templates: {
        expand: true,
        cwd: '.tmp/jekyll',
        src: ['**/*'],
        dest: 'dist'
      }
    },

    useminPrepare: {
      html: {
        expand: true,
        cwd: 'dist',
        src: ['**/*.html']
      },
      options: {
        root: ['src/{styles,scripts}', 'bower_components'],
        dest: 'dist'
      }
    },

    usemin: {
      html: {
        expand: true,
        cwd: 'dist',
        src: ['**/*.html']
      }
    },

    watch: {
      styles: {
        options: { dot: true },
        files: ['src/styles/**/*.scss'],
        tasks: ['build-styles']
      },
      scripts: {
        options: { dot: true },
        files: ['src/scripts/**/*.js'],
        tasks: ['build-scripts']
      },
      assets: {
        options: { dot: true },
        files: ['src/{images,fonts,media}/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: ['src/templates/**/*'],
        tasks: ['build-templates']
      }
    }

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
