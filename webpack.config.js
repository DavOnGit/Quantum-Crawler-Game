const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ENV = process.env.NODE_ENV
console.log(process.env.NODE_ENV)

const isProd = ENV === 'production'
const entryProd = {
  application: [
    'script!jquery/dist/jquery.min.js',
    'script!underscore/underscore-min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/main.jsx'
  ],
  vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux']
}
const entryDev = {
  application: [
    'webpack-hot-middleware/client',
    'script!jquery/dist/jquery.min.js',
    'script!underscore/underscore-min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/main.jsx'
  ],
  vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux']
}

module.exports = {
  debug: !isProd,
  cache: !isProd,
  entry: isProd ? entryProd : entryDev,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  // externals: {
  //   jquery: 'jQuery',
  //   underscore: '_'
  // },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/api',
      './app/lib',
      './app/components',
      './app/containers',
      './app/constants',
      './app/actions',
      './app'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss',
      reducers: 'app/reducers/',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    // noParse: /\.min\.js$/,
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      { // JavaScript / ES6
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/
      },
      { // Css
        test: /\.css$/,
        loader: isProd ? ExtractTextPlugin.extract('style', 'css?sourceMap!postcss') : 'style!css?sourceMap'
      },
      { // Scss
        test: /\.scss$/,
        loader: isProd ? ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded')
          : 'style!css?sourceMap!postcss!sass?sourceMap&outputStyle=expanded'
      },
      { // Images inline base64 URLs for <=8k images, direct URLs for the rest
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      { // Fonts
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash]'
        }
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  plugins: ENV === 'development' ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', '_': 'underscore'}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.bundle.js',
      minChunks: Infinity
    })
  ]
  : ENV === 'production' ? [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery', '_': 'underscore'}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('styles/bundle.css', {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {warnings: false, drop_console: false, drop_debugger: true},
      output: {ascii_only: true, comments: false}
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.bundle.js',
      minChunks: Infinity
    })
  ]
  : console.error('webpack plugins error: env is ' + ENV),
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'
}
