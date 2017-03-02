var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

// Create our app
var app = express()
var compiler = webpack(config);
const PORT = process.env.PORT || 3000

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, 'localhost', function(err){
  if (err) {
    console.log(err)
    return
  };
  console.log('Express server running at localhost:' + PORT)
})
