module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      src: ['dist/*']
    },

    newer: {
      options: {
        cache: '.tmp/newer'
      }
    },

    sass: {
      options: {
        sourcemap: 'none',
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
      },
      other: {
        expand: true,
        cwd: 'src',
        src: ['*/**/*', '!{fonts,images,media,scripts,styles,templates}/**/*'],
        dest: 'dist'
      }
    },

    concat: { generated: {} },
    uglify: { generated: {} },
    cssmin: { generated: {} },

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
      },
      other: {
        files: [
          'src/**/*',
          '!src/{fonts,images,media,scripts,styles,templates}/*'
        ],
        tasks: ['build-other']
      }
    },

    ftp_push: grunt.file.readJSON('deploy.json').ftp,

    rsync: grunt.file.readJSON('deploy.json').rsync

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
