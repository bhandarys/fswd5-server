var c9 = require('./c9'); // keep Cloud9 happy

var express = require('express');
var morgan = require('morgan');

var hostname = c9.ip('localhost');
var port = c9.port(3000);

var app = express();

app.use(morgan('dev')); // logger

function auth(req, res, next) {
  console.log(req.headers);

  var authHeader = req.headers.authorization;

  if (!authHeader) {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
    return;
  }

  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  if (user == 'admin' && pass == 'password') {
    next(); // authorized
  }
  else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
  }
}

app.use(auth); // authentication

app.use(express.static(__dirname + '/public')); // static content server

app.use(function (err, req, res, next) {  // error handler
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
