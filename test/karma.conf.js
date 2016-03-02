'use strict';

module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],
    reporters: ['spec'],
    logLevel: config.LOG_ERROR,
    browsers: ['PhantomJS'],
    preprocessors: {
      'specs/*Spec.js': ['browserify']
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-browserify'
    ],
    files: [
      '../bower_components/jquery/dist/jquery.js',
      '../bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'specs/*Spec.js',
      {
        pattern: 'fixtures/*.html',
        watched: true,
        included: false,
        served: true
      }
    ]
  });
};
