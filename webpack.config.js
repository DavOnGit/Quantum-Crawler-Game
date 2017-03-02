const path = require('path')
const webpack = require('webpack')
const envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log(process.env.NODE_ENV);
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'))
} catch (e) {
  
}

module.exports = {
  debug: true,
  entry: [
    'webpack-hot-middleware/client',
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/main.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: process.env.NODE_ENV === 'development' ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'}),
  ] : [
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {warnings: false, drop_console: true, drop_debugger: true},
      output: {ascii_only: true, comments: false}
    })
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/containers',
      './app/constants',
      './app/actions'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss',
      reducers: 'app/reducers/',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      { loader: 'eslint-loader',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/ }
    ],
    loaders: [
      { loaders: ['babel'],
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/ }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
}
