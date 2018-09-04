var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
		stylish = require('jshint-stylish'),
		karma = require('karma'),
		args = require('yargs').argv;

var prod = args.prod;

var karmaFiles = ['node_modules/jquery/dist/jquery.min.js',
			'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'
			]
var specs = 'js/spec/*.js';
var bundle = 'dist/js/**/*.js';

var scripts = ['src/app/client/**/*.js', '!src/app/client/*.js']

gulp.task('scripts', function () {
	gulp.src(scripts)

	.pipe($.ngAnnotate())
		.pipe(!prod ? $.sourcemaps.init() : $.util.noop())
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe($.concat('bundle.js'))
		.pipe(prod ? $.uglify() : $.util.noop())
		.pipe(!prod ? $.sourcemaps.write() : $.util.noop())
		.pipe(gulp.dest('dist/js'));
})

gulp.task('validate', function(){
	gulp.src(scripts)
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish))
	 .pipe(prod ? $.jshint.reporter('fail') : $.util.noop())
})

gulp.task('default', ['test'], function(){
	gulp.watch(scripts, ['test'])

})

gulp.task('test', ['scripts', 'validate'], function(done){
	var preprocessors = {}
	preprocessors[bundle] = [ 'coverage' ];

	var files = [specs, bundle]
	 files = karmaFiles.concat(files);

	new karma.Server({
		configFile: __dirname + '/karma.conf.js',
		files: files,
		preprocessors: preprocessors,
		singleRun: true
	}, function () {
		done();
	}).start();
})
