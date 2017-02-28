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
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// app.use(function(req, res, next){
//   if(req.headers['x-forwarded-proto'] === 'https'){
//     res.redirect('http://' + req.hostname + req.url)
//   } else {
//     next()
//   }
// })

//app.use(express.static('public'))

app.listen(PORT, function(err){
  if (err) return console.log(err);
  console.log('Express server is up on port ' + PORT)
})
