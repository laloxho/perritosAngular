'use strict';

module.exports = function(grunt){

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);
	
	// Automatically load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});
	
	// Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: 'jshintrc.txt',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'app/scripts/{,*/}*.js'
				]
			}
		},
		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist'
			}
		},
		concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare in running time
            dist: {}
        },
        uglify: {
            generated: {
				options: {
					output: {
						comments: false,	// preservar los comentarios en el codigo
						beautify: true	// imprimir human-readable code
					},
					compress: {
						drop_debugger: false,	// discard calls to debugger
						drop_console: false,	// discard calls to console.* functions
						sequences: false	// cuando sea posible concatenar multiples stmt con comas
					},
					mangle: true	// make changes to your variable and function names
				}
			}
        },
        cssmin: {
            // dist configuration is provided by useminPrepare in running time
            dist: {}
        },
		filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 5
            },
            release: {
                // filerev: release hashes(md5) all assets(images, js and css) in dist directory
                files: [
                    {
                        src: [
                            'dist/scripts/*.js',
                            'dist/styles/*.css'
                        ]
                    }
                ]
            }
        },
		usemin: {
			html: ['dist/*.html'],
			css: ['dist/styles/*.css'],
			options: {
				assetsDir: ['dist', 'dist/styles']
			}
		},
		watch: {
			someFiles: {
				files: ['app/**', '!app/**/*.css', '!app/**/*.js'],
				tasks: ['build']
			},
			scripts: {
                files: ['app/scripts/*.js'],
                tasks: ['build']
            },
            styles: {
                files: ['app/styles/*.css'],
                tasks: ['build']
            },
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'app/{,*/}*.*',
				]
			}
		},
		connect: {
			options: {
				port: 5000,
				
				// change this to 0.0.0.0 to access the server from outside
				hostname: 'localhost',
				livereload: 3572
			},
			dist: {
				options: {
					open: true,
					base: {
						path: 'dist',
						options: {
							index: 'index.html',
							maxAge: 300
						}
					}
				}
			}
		},
		copy: {
			dist: {
				cwd: 'app',

				// we are saying to grunt: copy EVERYTHING except js files and css files
				// because they are going to be copied automatically by usemin and all its mini-tasks
				src: ['**', '!styles/**/*.css', '!scripts/**/*.js'],
				
				dest: 'dist',
				expand: true
			},
			scripts: {
        files: [
          {
            //for angular
            expand: true, 
            do: true, 
            cwd: 'bower_components/angular', 
            src: ['*.min.js'], 
            dest: 'dist/scripts'
          }
        ]
      }
		},
		clean: {
			build: {
				src: ['dist/', '.tmp/']
			}
		}
	});
	
	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		//'filerev',
		'usemin'
	]);
	
	grunt.registerTask('serve', ['build', 'connect:dist', 'watch']);
	grunt.registerTask('default', ['build']);
	
};
