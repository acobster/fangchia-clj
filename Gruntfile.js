/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          cleanBowerDir: true
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
      },
      js: {
        nonull: true,
        src: [
          'node_modules/jquery/dist/jquery.js',
          'resources/js/responsive-nav.js',
          'resources/js/project.js',
        ],
        dest: 'resources/public/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        src: 'resources/public/js/app.js',
        dest: 'resources/public/js/app.min.js'
      },
      map_js: {
        src: 'resources/js/map.js',
        dest: 'resources/public/js/map.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          'jQuery': true,
          'console': true,
          'require': true,
          'google': true,
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: ['resources/js/project.js', 'resources/js/responsive-nav.js']
      },
      map_js: {
        src: 'resources/js/map.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          compress: true
        },
        files: {
          'resources/public/css/style.css': ['resources/less/style.less']
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: '<%= jshint.js.src %>',
        tasks: ['jshint:js', 'concat:js', 'uglify:js']
      },
      map_js: {
        files: 'resources/js/map.js',
        tasks: ['jshint:map_js', 'uglify:map_js']
      },
      less: {
        files: ['resources/less/*.less'],
        tasks: ['less']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'watch']);

};
