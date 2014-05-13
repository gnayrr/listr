module.exports = function (grunt) { 'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			
			all: [
				'Gruntfile.js',
				'lib/**/listr.js',
				'test/**/*.js'
			],

			options: {
				jshintrc: '.jshintrc'
			}
		},

		jasmine: {
			src: 'lib/**/*.js',

			options: {
				specs: 'test/**/*.js',
				vendor: 'vendor/**/*.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['test']);
};