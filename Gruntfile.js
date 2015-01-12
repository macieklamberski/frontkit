module.exports = function(grunt) {

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('frontline.json'),

    clean: {
      src: ['<%= config.paths.dist %>/*']
    },

    newer: {
      options: {
        cache: '<%= config.paths.tmp %>/newer'
      }
    },

    sass: {
      options: {
        sourcemap: 'none',
        cacheLocation: '<%= config.paths.tmp %>/sass',
        style: 'expanded',
        loadPath: ['<%= config.paths.src %>/styles', 'bower_components']
      },
      dist: {
        expand: true,
        cwd: '<%= config.paths.src %>/styles',
        src: ['**/*.scss'],
        dest: '<%= config.paths.dist %>/styles',
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
        cwd: '<%= config.paths.dist %>/styles',
        src: ['**/*.css'],
        dest: '<%= config.paths.dist %>/styles'
      }
    },

    svgmin: {
      dist: {
        expand: true,
        cwd: '<%= config.paths.dist %>',
        src: ['{images,media}/**/*.svg'],
        dest: '<%= config.paths.dist %>'
      }
    },

    svg2png: {
      dist: {
        src: ['<%= config.paths.dist %>/{images,media}/**/*.svg']
      }
    },

    imagemin: {
      dist: {
        expand: true,
        cwd: '<%= config.paths.dist %>',
        src: ['{images,media}/**/*.{png,jpg,gif}'],
        dest: '<%= config.paths.dist %>'
      }
    },

    jekyll: {
      options: {
        src : '<%= config.paths.src %>/templates'
      },
      dist: {
        options: {
          dest: '<%= config.paths.tmp %>/jekyll'
        }
      }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: '<%= config.paths.src %>',
        src: ['scripts/**/*.js'],
        dest: '<%= config.paths.dist %>'
      },
      assets: {
        expand: true,
        cwd: '<%= config.paths.src %>',
        src: ['{images,fonts,media}/**/*'],
        dest: '<%= config.paths.dist %>'
      },
      templates: {
        expand: true,
        cwd: '<%= config.paths.tmp %>/jekyll',
        src: ['**/*'],
        dest: '<%= config.paths.dist %>'
      },
      other: {
        expand: true,
        cwd: '<%= config.paths.src %>',
        src: ['*/**/*', '!{fonts,images,media,scripts,styles,templates}/**/*'],
        dest: '<%= config.paths.dist %>'
      }
    },

    concat: { generated: {} },
    uglify: { generated: {} },
    cssmin: { generated: {} },

    useminPrepare: {
      html: {
        expand: true,
        cwd: '<%= config.paths.dist %>',
        src: ['**/*.html']
      },
      options: {
        root: ['<%= config.paths.src %>/{styles,scripts}', 'bower_components'],
        dest: '<%= config.paths.dist %>'
      }
    },

    usemin: {
      html: {
        expand: true,
        cwd: '<%= config.paths.dist %>',
        src: ['**/*.html']
      }
    },

    watch: {
      styles: {
        options: { dot: true },
        files: ['<%= config.paths.src %>/styles/**/*.scss'],
        tasks: ['build-styles']
      },
      scripts: {
        options: { dot: true },
        files: ['<%= config.paths.src %>/scripts/**/*.js'],
        tasks: ['build-scripts']
      },
      assets: {
        options: { dot: true },
        files: ['<%= config.paths.src %>/{images,fonts,media}/**/*'],
        tasks: ['build-assets']
      },
      templates: {
        files: ['<%= config.paths.src %>/templates/**/*'],
        tasks: ['build-templates']
      },
      other: {
        files: [
          '<%= config.paths.src %>/**/*',
          '!<%= config.paths.src %>/{fonts,images,media,scripts,styles,templates}/*'
        ],
        tasks: ['build-other']
      }
    },

    ftp_push: grunt.file.readJSON('frontline.json').ftp,

    rsync: grunt.file.readJSON('frontline.json').rsync

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
