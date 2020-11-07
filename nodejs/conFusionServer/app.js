var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishesRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then(db => {
  console.log('Correctly connected to the db');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

const auth = (req, res, next) => {
  console.log(req.signedCookies);
  if (!req.signedCookies.user)  {
    console.log(req.headers);
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader){
      let err =new Error('You are not authorized, no auth header');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pwd = auth[1];

    console.log('first login');
    if (user === 'admin' && pwd === 'password') {
      res.cookie('user', 'admin', {signed: true})
      next(); // user is authorized
    } else {
      let err =new Error(`You are not authenticated with ${user}: ${pwd}`);
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else {
    console.log('subsequent login');
    let cookie = req.signedCookies;
    if (cookie.user !== 'admin') {
      let err =new Error(`You are not authenticated`);
      err.status = 401;
      next(err);
    } else {
      next();
    }
  }
};
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishesRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
