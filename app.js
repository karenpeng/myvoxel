var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 11235;

var ejs = require('ejs');

app.set('views', __dirname);

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.html');
});

server.listen(port);