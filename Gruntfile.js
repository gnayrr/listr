module.exports = function (grunt) { 'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {

			options: {
				compress: {
					drop_console: true
				}
			},

			listr: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: '**/*.js',
						dest: 'dist/',
						ext: '.min.js'
					}
				]
			}
		},

		jshint: {
			
			all: [
				'Gruntfile.js',
				'src/**/listr.js',
				'test/**/*.js'
			],

			options: {
				jshintrc: '.jshintrc'
			}
		},

		jasmine: {
			src: 'src/**/*.js',

			options: {
				specs: 'test/**/*.js',
				vendor: 'vendor/**/*.js'
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('release', ['test', 'uglify']);
	grunt.registerTask('default', ['test']);
};