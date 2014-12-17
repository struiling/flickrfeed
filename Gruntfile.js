module.exports = function(grunt) {

    //var docroot = 'parse/public';
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            dist: {
                options: {
                // Target-specific options go here.
                },
                src: 'src/css/index.css',
                dest: 'build/css/index.css'
            }
        },
        clean: {
            clean: ['build/*']
        },
        concat: {   
            options: {
              separator: ';',
            },
            dist: {
                src: [
                    'src/js/lib/!(jquery.min.js|media.match.min.js|fastclick.js|modernizr.js)*.js' // All JS in the lib folder
                ],
                dest: 'src/js/source.js',
            }
        },
        copy: {
            build: {
                files: [
                    {
                        dest: 'build/index.html',
                        src: 'src/index.html'
                    },
                    {
                        dest: 'build/favicon.ico',
                        src: 'src/favicon.ico'
                    },
                    {
                        dest: 'htdocs/css/index.css',
                        src: 'src/css/index.css'
                    },
                    {
                        dest: 'build/css/index-desktop.css',
                        src: 'src/css/index-desktop.css'
                    },
                    {
                        dest: 'htdocs/js/index.js',
                        src: 'src/js/index.js'
                    },
                    {
                        dest: 'build/js/source.min.js',
                        src: 'src/js/source.min.js'
                    },
                    {
                        dest: 'build/js/lib/jquery.min.js',
                        src: 'src/js/lib/jquery.min.js'
                    },
                    {
                        dest: 'build/js/lib/media.match.min.js',
                        src: 'src/js/lib/media.match.min.js'
                    },
                    {
                        dest: 'build/js/lib/fastclick.js',
                        src: 'src/js/lib/fastclick.js'
                    },
                    {
                        dest: 'build/js/lib/modernizr.js',
                        src: 'src/js/lib/modernizr.js'
                    },
                    {
                        cwd: 'src/img',
                        dest: 'build/img/',
                        src: '**',
                        expand: true
                    },
                    {
                        cwd: 'src/webfonts',
                        dest: 'build/webfonts/',
                        src: '**',
                        expand: true
                    }
                ]
            },
            deploy: {
                files: [
                    /*{
                        dest: '../dist/css/index.css',
                        src: 'build/css/index.css'
                    },
                    {
                        dest: '../dist/js/index.js',
                        src: 'build/js/index.js'
                    },
                    {
                        dest: '../dist/js/source.min.js',
                        src: 'build/js/source.min.js'
                    },
                    {
                        dest: '../dist/js/lib/jquery.min.js',
                        src: 'build/js/lib/jquery.min.js'
                    },
                    {
                        dest: '../dist/js/lib/fastclick.js',
                        src: 'build/js/lib/fastclick.js'
                    },
                    {
                        dest: '../dist/index.html',
                        src: 'build/index.html'
                    },*/
                    {
                        cwd: 'build',
                        dest: '../dist/',
                        src: '**',
                        expand: true
                    }
                ]
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
                    jQuery: false,
                    _gaq: false,
                    google: false,
                    console: false,
                    FB: false,
                    $: false,
                    _: false
                }
            },
            src: ['src/js/index.js']
        },
        sass: {
            dist: {
                files: {
                    'src/css/index.css': 'src/scss/styles.scss'
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['newer:uglify', 'newer:copy:build'],
                options: {
                    spawn: false,
                },
            },
            sass: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            },
            styles: {
                files: ['src/css/index.css', 'src/css/index-desktop.css'],
                tasks: ['autoprefixer', 'newer:copy:build']
            },
            assets: {
                files: ['src/*.html', 'src/img/'],
                tasks: ['newer:copy:build']
            }   
        },
        uglify: {
            build: {
                //src: 'src/js/source.js',
                //dest: 'src/js/source.min.js'
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['common', 'watch']);

    grunt.registerTask('common', [/*'clean',*/ /*'jshint',*/ 'sass', 'newer:uglify', 'autoprefixer', 'newer:copy:build']);

    grunt.registerTask('deploy', ['common', 'newer:copy:deploy']);

};