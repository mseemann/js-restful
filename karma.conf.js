module.exports = function (config) {
   var _config = {
      basePath: '',
      frameworks: ['jasmine'],

      files: [
         { pattern: 'src/**/*.spec.ts', watched: false }
      ],

      preprocessors: {
         'src/**/*.ts': ['webpack', 'sourcemap']
      },

      webpack: {
         resolve: {
            root: __dirname,
            extensions: ['', '.ts', '.js', '.json'],
         },
         devtool: 'inline-source-map',
         module: {
            loaders: [
               {
                  test: /\.ts$/,
                  loader: 'ts',
                  exclude: [/node_modules/]
               }
            ]
         },
         stats: { colors: true, reasons: true },
         debug: false
      },

      webpackServer: {
         noInfo: true
      },

      reporters: ['progress'],
      port: 9875,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['PhantomJS'],
      singleRun: true
   };

   config.set(_config);
};