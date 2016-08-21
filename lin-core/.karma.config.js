import webpackConfig from './webpack.config'

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['mocha', 'coverage'],

    // list of files to exclude
    //exclude: [    ],

    webpackServer: {
      noInfo: true
    },

    plugins: [
      'karma-coverage',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-mocha-reporter'
    ],

    webpack: webpackConfig,

    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    //logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

// Start these browsers, currently available:
     // - Chrome
     // - ChromeCanary
     // - Firefox
     // - Opera (has to be installed with `npm install karma-opera-launcher`)
     // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
     // - PhantomJS
     // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)

    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 10000,
    singleRun: true,

    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: '.coverage', subdir: '.' },
        { type: 'text-summary', dir: '.coverage', subdir: '.' }
      ]
    },
    proxies: {
        '/api': {
            'target': 'http://s.feicuibaba.com',
            'changeOrigin': true
        }
    }
  })
}
