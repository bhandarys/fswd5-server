var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

// Make sure facebook client ID and Secret have been defined (manually).

if (!config.facebook.clientID || !config.facebook.clientSecret) {
  throw new Error('conFusionClientID and conFusionClientSecret must be defined to the facebook client ID and secret respectively.');
}

mongoose.connect(config.mongoUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to DB server:", config.mongoUrl);
});

var routes = require('./routes/index');
var users = require('./routes/users');

var dishRouter = require('./routes/dishRouter');
var favoriteRouter = require('./routes/favoriteRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

var app = express();

// Skip redirection to HTTPS for Cloud9 - it doesn't work.
// Secure traffic only
app.all('*', function (req, res, next) {
  console.log('req:', req.secure ? 'https': 'http', req.hostname, req.url, app.get('port'));

  if (req.secure || process.env.C9_PROJECT)
    return next();

  res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// passport config
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/dishes', dishRouter);
app.use('/favorites', favoriteRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
