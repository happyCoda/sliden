'use strict';

var gulp = require('gulp'),
  util = require('gulp-util'),
  clean = require('gulp-clean'),
  sourceMap = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),
  uglify = require('gulp-uglify'),
  webServer = require('gulp-webserver'),
  browserify = require('browserify'),
  vinylSource = require('vinyl-source-stream'),
  vinylBuffer = require('vinyl-buffer'),
  KarmaServer = require('karma').Server,
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
  return browserify('js/src/app.js').bundle()
    .pipe(vinylSource('sliden.min.js'))
    .pipe(vinylBuffer())
    // .pipe(uglify())
    .pipe(sourceMap.init())
    .pipe(sourceMap.write('./'))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('tdd', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('server', function () {
  return gulp.src('./')
    .pipe(webServer({
      livereload: true,
      port: 1337
    }));
});

gulp.task('css', function () {
  return gulp.src(paths.css.src)
    .pipe(sourceMap.init())
    .pipe(concat('style.css'))
    .pipe(less().on('error', function () {
      util.log(util.colors.red('Something went wrong here!!!'));
    }))
    .pipe(sourceMap.write('./'))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('observe', ['server'], function () {
  gulp.watch([
    paths.js.src,
    paths.css.src
  ], ['lint', 'tdd', 'bundle', 'css'], function (evt) {
    util.log(util.colors.yellow('File – ' + evt.path + ' has been changed...'));
  });
});
