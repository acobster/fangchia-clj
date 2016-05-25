var
  LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
  mountFolder = function( connect, dir ) {
    return connect.static(require('path').resolve(dir));
  };

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
    connect: {
      server: {
        options: {
          port: 8888,
          base: 'public',
          keepalive: true,
          livereload: false
        }
      },
      livereload: {
        options: {
          middleware: function( connect ) {
            return [
              lrSnippet,
              mountFolder(connect, './')
            ];
          }
        }
      }
    },
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
        stripBanners: true
      },
      js: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'js/responsive-nav.js',
          'js/project.js',
        ],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      js: {
        src: 'public/js/app.js',
        dest: 'public/js/app.min.js'
      },
      map_js: {
        src: 'js/map.js',
        dest: 'public/js/map.min.js'
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
        src: ['js/project.js', 'js/responsive-nav.js']
      },
      map_js: {
        src: 'js/map.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ['less'],
          compress: true
        },
        files: {
          'public/css/style.css': ['less/style.less']
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
        files: 'js/map.js',
        tasks: ['jshint:map_js', 'uglify:map_js']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);

};
