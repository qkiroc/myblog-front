var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpackConfig =	require('./webpack.config.js');

gulp.task('webpack', function () {
	gulp.src('./client/*')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['webpack']);