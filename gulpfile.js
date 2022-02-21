var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var postcssSVG = require('postcss-svg');

var path = {
	src: 'src/',
	destination: 'src/css/'
};

// Less
gulp.task('less', function() {
	gulp.src(path.src + 'css/main.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			compress: true
		}))
			.on('error', function(err){
				console.log(err.message);
				return false;
			})
		.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions']
			}),
			postcssSVG({
				paths: ['src/img/svg-icons/'],
			}),
		]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.destination))
});


// Watch for less, js and twig files, images
gulp.task('watch', function() {
	watch(path.src + '**/*.less', function() {
		gulp.start('less');
	});
});

// Default task compiles all and starts server, then watches
gulp.task('default',
	[
		'less',
		'watch',
	]
);

