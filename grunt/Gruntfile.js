module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ["dist"],
    less: {
      all: {
        options: {
          paths: ["../static/less"]
        },
        files: {
          "dist/less/<%= pkg.name %>.css": "../static/less/main.less"
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "dist/handlebars/templates.js": ["../static/handlebars/**/*.hbs"]
        }
      }
    },
    concat: {
      css: {
        src: ['../components/bootstrap/docs/assets/css/bootstrap.css',
              '../components/bootstrap/docs/assets/css/bootstrap-responsive.css',
              'dist/less/<%= pkg.name %>.css'],
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      thirdparty_js: {
        src: ['../components/jquery/jquery.min.js',
              '../components/bootstrap/docs/assets/js/bootstrap.min.js',
              '../components/underscore/underscore-min.js',
              '../components/handlebars/handlebars.runtime.js'],
        dest: 'dist/js/thirdparty.min.js'
      },
      application_js: {
        src: ['dist/handlebars/templates.js',
              '../static/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    cssmin: {
      compress: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': [
            'dist/css/<%= pkg.name %>.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        sourceMap: 'dist/js/<%= pkg.name %>.map'
      },
      build: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: '../static/less/**/*.less',
        tasks: ['less'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less', 'handlebars', 'concat', 'cssmin', 'uglify']);

};

