/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var webroot = "./wwwroot/";

var paths = {
    js: webroot + "js/**/*.js",
    minJs: webroot + "js/**/*.min.js",
    css: webroot + "css/**/*.css",
    minCss: webroot + "css/**/*.min.css",
    concatJsDest: webroot + "js/site.min.js",
    concatCssDest: webroot + "css/site.min.css",
	scripts: '../node_modules/'
};

var polyfills = [
	'./node_modules/core-js/client/shim.min.js',
	'./node_modules/zone.js/dist/zone.js',
	'./node_modules/reflect-metadata/Reflect.js',
	'./node_modules/systemjs/dist/system.src.js'
];

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const typescript = require('gulp-typescript');

const webAppFiles = ['scripts/app/**/*.js','scripts/app/**/*.ts'];
const webAppHtmlFiles = ['src/www/**/*.html'];
const webAppCssFiles = ['src/www/css/**/*.css'];

const entryPoints = [
	'./scripts/systemjs.config.js',
	'./scripts/app/main.ts'
];


gulp.task('process-web-app-html', () =>
	gulp.src(webAppHtmlFiles)
		.pipe(gulp.dest('wwwroot')));

gulp.task('process-web-app-css', () =>
	gulp.src(webAppCssFiles)
		.pipe(gulp.dest('dist/www/css')));

gulp.task("polyfills", () =>
    gulp.src(polyfills)
        .pipe(gulp.dest("wwwroot/js")));

gulp.task('process-web-app-js', () =>
	Promise.all(entryPoints.map(entryPoint =>
		new Promise((resolve, reject) =>
			gulp.src(entryPoint)
				.pipe(webpackStream({
					output: {
						filename: path.basename(entryPoint).replace('.ts','.js')
					},
					module: {
						loaders: [{
							test: /\.json$/,
							loader: 'json'
						},{
							test: /\.tsx?$/,
							loader: 'ts-loader',
							exclude: /node_modules/
						}]
					}
				}))
				.on('error', reject)
				.pipe(gulp.dest('wwwroot/js'))
				.on('end', resolve)))).catch(console.error));

gulp.task('default', [
	'process-web-app-html',
	'process-web-app-css',
	'process-web-app-js'
], function () {

	gulp.watch(webAppFiles, ['process-web-app-js']);
	gulp.watch(webAppCssFiles, ['process-web-app-css']);
	gulp.watch(webAppHtmlFiles, ['process-web-app-html']);

});