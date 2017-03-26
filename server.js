const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')
const compression = require('compression')

// Create our app
const app = express()
const compiler = webpack(config)
const ENV = process.env.NODE_ENV
//const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

if (ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    historyApiFallback: true
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
} else {
  app.use(compression())

  app.use(express.static(path.join(__dirname, 'public')))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
    return
  };
  console.log('Express server running on port', PORT)
})
