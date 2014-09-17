module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      tmp: {
        src: ['.tmp']
      },
      styles: {
        src: ['dist/styles']
      },
      scripts: {
        src: ['dist/scripts']
      },
      assets: {
        src: ['dist/images', 'dist/fonts', 'dist/media']
      },
      templates: {
        src: ['dist/*.html']
      }
    },

    sass: {
      dist: {
        files: {
          'dist/styles/main.css': 'src/styles/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      dist: {
        src: 'dist/styles/main.css',
        dest: 'dist/styles/main.css'
      }
    },

    cssmin: {
      build: {
        files: [
          {
            src: 'dist/styles/main.css',
            dest: 'dist/styles/main.css'
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

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/images',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/images'
          },
          {
            expand: true,
            cwd: 'dist/media',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/media'
          }
        ]
      }
    },

    useminPrepare: {
      html: {
        expand: true,
        cwd: 'dist',
        src: ['*.html']
      },
      options: {
        root: 'src',
        dest: 'dist'
      }
    },

    usemin: {
      html: {
        expand: true,
        cwd: 'dist',
        src: ['*.html']
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
        cwd: 'src',
        src: ['*.html'],
        dest: 'dist'
      }
    },

    watch: {
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['build-styles']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['build-scripts']
      },
      assets: {
        files: ['src/{images,fonts,media}/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: ['src/*.html'],
        tasks: ['build-templates']
      }
    }

  });

  grunt.registerTask('build-styles', [
    'sass',
    'autoprefixer'
  ]);
  grunt.registerTask('build-scripts', [
    'copy:scripts'
  ]);
  grunt.registerTask('build-assets', [
    'copy:assets',
    'imagemin'
  ]);
  grunt.registerTask('build-templates', [
    'copy:templates',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'clean:tmp'
  ]);
  grunt.registerTask('build', [
    'clean',
    'build-styles',
    'build-scripts',
    'build-assets',
    'build-templates'
  ]);
  grunt.registerTask('default', [
    'watch'
  ]);

};
