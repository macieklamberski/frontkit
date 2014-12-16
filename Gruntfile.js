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
        files: [
          {
            expand: true,
            cwd: 'src/styles',
            src: ['**/*.scss'],
            dest: 'dist/styles',
            ext: '.css'
          }
        ]
      }
    },

    autoprefixer: {
      options: {
        cascade: false,
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/styles',
            src: ['**/*.css'],
            dest: 'dist/styles'
          }
        ]
      }
    },

    cssmin: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'dist/styles',
            src: ['**/*.css'],
            dest: 'dist/styles'
          }
        ]
      }
    },

    uglify: {
      build: {
        files: [
          {
            src: 'dist/scripts/main.js',
            dest: 'dist/scripts/main.js'
          }
        ]
      }
    },

    svg2png: {
      dist: {
        files: [
          {
            src: ['dist/images/**/*.svg']
          },
          {
            src: ['dist/media/**/*.svg']
          }
        ]
      }
    },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/images',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/images'
          },
          {
            expand: true,
            cwd: 'dist/media',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/media'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/images',
            src: ['**/*.svg'],
            dest: 'dist/images'
          },
          {
            expand: true,
            cwd: 'dist/media',
            src: ['**/*.svg'],
            dest: 'dist/media'
          }
        ]
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

    copy: {
      scripts: {
        expand: true,
        cwd: 'src/scripts',
        src: ['main.js'],
        dest: 'dist/scripts'
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/images',
            src: ['**/*'],
            dest: 'dist/images'
          },
          {
            expand: true,
            cwd: 'src/fonts',
            src: ['**/*'],
            dest: 'dist/fonts'
          },
          {
            expand: true,
            cwd: 'src/media',
            src: ['**/*'],
            dest: 'dist/media'
          }
        ]
      },
      templates: {
        expand: true,
        cwd: '.tmp/jekyll',
        src: ['**/*'],
        dest: 'dist'
      }
    },

    watch: {
      styles: {
        options: { dot: true },
        files: ['src/styles/**/*'],
        tasks: ['build-styles']
      },
      scripts: {
        options: { dot: true },
        files: ['src/scripts/**/*'],
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
    'concat',
    'cssmin',
    'uglify',
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
