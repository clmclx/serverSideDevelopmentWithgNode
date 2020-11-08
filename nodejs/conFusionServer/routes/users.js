var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('./../models/users');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
      .then(user => {
        if (user !== null) {
          var err = new Error(`user ${req.body.username} already exist`);
          err.status  = 403;
          next(err)
        } else {
          return User.create({
            username: req.body.username,
            password: req.body.password
          })
        }
      })
      .then( user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          status: 'Registration successful',
          user: user
        })
      }, err=>next(err))
      .catch(err => next(err));
});
router.post('/login', (req, res, next) => {
  if (!req.session.user) {

    console.log(req.headers);
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader){
      let err =new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pwd = auth[1];

    User.findOne({username: user}).then(user => {
      if (user === null) {
        let err =new Error(`Could not find user ${user}`);
        err.status = 403;
        return next(err);
      } else if (user.password !== pwd) {
        let err =new Error(`password is incorrect`);
        err.status = 403;
        return next(err);
      } else {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('you are authenticated');
      }
    }).catch(err => next(err));
  } else {
    res.statusCode =200;
    res.setHeader('Content-Type','application/json');
    res.end('You are already authenticated');
  }
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    // destroy the session, afterwards the cookie will be invalid
    req.session.destroy();
    // clear the cookie
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    let err = new Error('You are not logged in');
    err.status = 403;
    next(err)
  }
});


module.exports = router;
