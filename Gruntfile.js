module.exports = function(grunt) {

  // External tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
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

    uglify: {
      scripts: {
        files: {
          'dist/scripts/main.js': ['dist/scripts/main.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/images/'
          },
          {
            expand: true,
            cwd: 'dist/media/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/media/'
          }
        ]
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: 'src/scripts/',
        src: ['main.js'],
        dest: 'dist/scripts/'
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/images/',
            src: ['**/*'],
            dest: 'dist/images/'
          },
          {
            expand: true,
            cwd: 'src/fonts/',
            src: ['**/*'],
            dest: 'dist/fonts/'
          },
          {
            expand: true,
            cwd: 'src/media/',
            src: ['**/*'],
            dest: 'dist/media/'
          }
        ]
      },
      templates: {
        expand: true,
        cwd: 'src/',
        src: ['*.html'],
        dest: 'dist/'
      }
    },

    watch: {
      styles: {
        files: ['src/styles/**/*.scss'],
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

  // Custom tasks
  grunt.registerTask('build-styles', ['sass', 'autoprefixer']);
  grunt.registerTask('build-scripts', ['copy:scripts', 'uglify']);
  grunt.registerTask('build-assets', ['copy:assets', 'imagemin']);
  grunt.registerTask('build-templates', ['copy:templates']);
  grunt.registerTask('build', ['build-styles', 'build-scripts', 'build-assets']);
  grunt.registerTask('default', ['watch']);

};
