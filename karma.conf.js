var path = require('path');

module.exports = function (config) {
   var _config = {
      basePath: '',
      frameworks: ['jasmine'],

      files: [
         { pattern: 'src/**/*.spec.ts', watched: false }
      ],

      preprocessors: {
         'src/**/*.ts': ['webpack', 'sourcemap', 'coverage']
      },

      webpack: {
         resolve: {
            root: __dirname,
            modulesDirectories: ['node_modules', 'src'],
            extensions: ['', '.ts', '.js', '.json'],
         },
         devtool: 'inline-source-map',
         module: {
            loaders: [
               {
                  test: /\.ts$/,
                  loader: 'ts',
                  exclude: /node_modules/
               }
            ]
         },
         stats: { colors: true, reasons: true },
         debug: true
      },

      webpackServer: {
         noInfo: true
      },

      reporters: ['progress', 'coverage'], //, 'coveralls'

      coverageReporter: {
         type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
         dir: 'coverage/'
      },

      port: 9875,
      colors: true,
      logLevel: config.LOG_DEBUG,
      autoWatch: false,
      browsers: ['PhantomJS'],
      singleRun: true
   };

   config.set(_config);
};