/*
 * Gruntfile.js
 *
 * Grunt provides configuration for tasks and npm extensions. It reads JSON data from package.json
 * and YAML data from config.yml. Do not edit existing tasks until you're familiar with how each works.
 * Learn more at http://gruntjs.com.
 *
 */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),
    banner: '/* \n' +
            ' * Copyright © <%= grunt.template.today(\'yyyy\') %> <%= site.title %>\n' +
            ' * \n' +
            ' * <%= pkg.name %>, Updated <%= grunt.template.today(\'yyyy.mm.dd\') %>\n' +
            ' * Code and documentation licensed under the <%= site.license %> license\n' +
            ' * \n' +
            ' */\n',

    shell: {
      gems: {
        command: ['gem update --system --no-document',
                  'gem install github-pages'].join('&&'),
        options: {
          stdout: true
        }
      }
    },

    clean: {
      assets: ['assets/css/main.min.css',
               'assets/js/main.min.js',
               'assets/js/lib.min.js']
    },

    concat: {
      vendors: {
        src: ['plugins/lib/smoothscroll.min.js',
              'plugins/lib/wow.min.js',
              'plugins/lib/jquery-isotope.min.js',
              'plugins/lib/jquery-magnific-popup.min.js',
              'plugins/lib/jquery-carousel.min.js'],
        dest: 'assets/js/lib.min.js'
      },

      main: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['plugins/settings.js'],
        dest: 'assets/js/main.min.js'
      }
    },

    uglify: {
      vendors: {
        options: {
          report: 'min'
        },
        src: '<%= concat.vendors.dest %>',
        dest: 'assets/js/lib.min.js'
      },

      main: {
        options: {
          banner: '<%= banner %>',
          report: 'min'
        },
        src: '<%= concat.main.dest %>',
        dest: 'assets/js/main.min.js'
      }
    },

    recess: {
      unminify: {
        options: {
          compile: true,
          compress: false,
          banner: '<%= banner %>'
        },
        src: ['less/@main.less'],
        dest: 'assets/css/main.min.css'
      },
      minify: {
        options: {
          compile: true,
          compress: true,
          banner: '<%= banner %>'
        },
        src: ['<%= recess.unminify.src %>'],
        dest: '<%= recess.unminify.dest %>'
      }
    },

    pages: {
      test: {},
      start: {
        options: {
          watch: true,
          serve: true,
          baseurl: ['\'\'']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-jekyll-pages');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build',         ['clean', 'concat', 'uglify', 'recess:minify']);
  grunt.registerTask('build:pretty',  ['clean', 'concat', 'recess:unminify']);
  grunt.registerTask('install',       ['shell:gems']);
  grunt.registerTask('serve',         ['build', 'pages:start']);
  grunt.registerTask('serve:pretty',  ['build:pretty', 'pages:start']);
  grunt.registerTask('test',          ['pages:test']);
};