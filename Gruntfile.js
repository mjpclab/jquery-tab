module.exports = function (grunt) {
	var sourceDirectory = 'src/';
	var buildDirectory = 'build/';

	var npmTasks = [
		'grunt-contrib-jshint',
		'grunt-contrib-clean',
		'grunt-contrib-copy',
		'grunt-contrib-uglify'
	];
	npmTasks.forEach(function (task) {
		grunt.loadNpmTasks(task);
	});

	grunt.registerTask('default', ['jshint', 'clean', 'copy', 'uglify']);

	grunt.config.init({
		jshint: {
			all: [
				'Gruntfile.js',
				sourceDirectory + 'js/jquery-tab.js'
			]
		},
		clean: {
			default: [buildDirectory]
		},
		copy: {
			default: {
				sourceMap: true,
				files: [
					{
						expand: true,
						cwd: sourceDirectory,
						src: '*.js',
						dest: buildDirectory
					}
				]

			}
		},
		uglify: {
			default: {
				files: [
					{
						src: sourceDirectory + 'jquery-tab.js',
						dest: buildDirectory + 'jquery-tab.min.js'
					}
				]
			}
		}
	});

};