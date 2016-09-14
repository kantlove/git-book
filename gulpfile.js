"use strict";

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence')
var tslint       = require('gulp-tslint');
var exec         = require('child_process').exec;
var mocha        = require('gulp-mocha');
var gulp         = require('gulp-help')(gulp);
var path         = require('path');
var del          = require('del');
var tslintCustom = require('tslint');
var sassLint     = require('gulp-sass-lint');
var sass         = require('gulp-sass');
require('dotbin');

var tsFilesGlob = (function (c) {
  return c.filesGlob || c.files || 'src/**/*.ts';
})(require('./tsconfig.json'));

var cssFilesGlob = 'src/styles/*.sass';
var cssOutput = 'out/src/styles';

gulp.task('clean', 'Cleans the generated files from the output directory', function () {
  return del([
    'out/**/*'
  ]);
});

gulp.task('lint-src', 'Lints all TypeScript source files', function () {
  return gulp.src(tsFilesGlob)
    .pipe(tslint({
      tslint: tslintCustom,
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

gulp.task('lint-css', 'Lints all Sass files', function () {
  return gulp.src(cssFilesGlob)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint', 'Lints all', ['lint-src', 'lint-css'], function() {
  // Merge 2 lints
});

gulp.task('build-src', 'Compiles all TypeScript source files', ['lint'], function (cb) {
  return exec('tsc', function (err, stdout, stderr) {
    if(stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
});

gulp.task('build-css', 'Compiles all Sass files', ['lint'], function (cb) {
  return gulp.src(cssFilesGlob)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(cssOutput));
});

gulp.task('build', 'Compiles all', function (cb) {
  // Merge 2 builds
  gulpSequence('clean', ['build-src', 'build-css'])(cb);
});

gulp.task('test', 'Runs tests', ['build'], function (cb) {
  return gulp.src('out/**/*.test.js')
    .pipe(mocha({
      require: [
        'intelli-espower-loader'
        ]
    }));
});

gulp.task('watch-src', 'Watches ts source files and runs build on change', function () {
  gulp.watch(tsFilesGlob, ['build-src']);
});

gulp.task('watch-css', 'Watches ts source files and runs build on change', function () {
  gulp.watch(cssFilesGlob, ['build-css']);
});

gulp.task('watch', 'Watches all and runs build on change', ['watch-src', 'watch-css'], function () {
  // Merge 2 watches
});
