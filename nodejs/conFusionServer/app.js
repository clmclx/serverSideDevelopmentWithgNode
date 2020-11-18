var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const session  = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishesRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');
const config = require("./config");

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then(db => {
  console.log('Correctly connected to the db');
});

const app = express();

//check whether it is coming from the secure port or not
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    // redirect to the secure server and change the redirection code
    console.log('insecure port');
    res.redirect(307, `https://${req.hostname}:${app.get('secPort')}${req.url}`); // 307 says that the target resource is hosted on a different URI and user agent must not change the request method
  }

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());
// the root and users endpoint have to be accessible withouth being authenticated so we are putting this above the authentication function
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishesRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);

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
