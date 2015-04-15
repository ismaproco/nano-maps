var mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            uses_defaults: ['src/js/**/*.js'],
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/bower_components/bootstrap/dist/fonts/',
                    src: '*',
                    dest: 'build/bower_components/bootstrap/dist/fonts/'
                }]
            }
        },
        cssmin: {
            target: {
                    files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            },
            dist: {
                    files: [{
                    expand: true,
                    cwd: 'src/bower_components/bootstrap/dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/bower_components/bootstrap/dist/css/',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'build/index.html': 'src/index.html'     // 'destination': 'source'
              }
            }
        },
        uglify: {
            options: {
              mangle: false,
              compress: false
            },
            my_target: {
                files: {
                    // distribution libraries
                    'build/bower_components/jquery/jquery.js': ['src/bower_components/jquery/jquery.js'],
                    'build/bower_components/bootstrap/dist/js/bootstrap.js': ['src/bower_components/bootstrap/dist/js/bootstrap.js'],
                    'build/bower_components/knockout/dist/knockout.js': ['src/bower_components/knockout/dist/knockout.js'],
                    'build/bower_components/underscore/underscore.js': ['src/bower_components/underscore/underscore.js']
                }
            },
            sources: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['**/*.js'],
                    dest: 'build/js/',
                    ext: '.js'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/images',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'build/images'                  // Destination path prefix
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint','copy:dist','cssmin', 'uglify','uglify','htmlmin','imagemin']);
};
