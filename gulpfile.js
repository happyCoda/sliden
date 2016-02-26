'use strict';

var gulp = require('gulp'),
  util = require('gulp-util'),
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  uglify = require('gulp-uglify'),
  browserify = require('browserify'),
  vinyl = require('vinyl-source-stream'),
  paths = {
    js: {
      src: 'js/src/*.js',
      dest: 'js/dest/',
      vendor: 'js/vendor/*.js'
    },
    css: {
      src: 'css/*.less',
      dest: 'css/'
    }
  };


gulp.task('lint', function () {
  return gulp.src(paths.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle', function () {
  return browserify('js/src/sliden.js').bundle()
    .pipe(vinyl('sliden.min.js'))
    .pipe(gulp.dest(paths.js.dest));
});
