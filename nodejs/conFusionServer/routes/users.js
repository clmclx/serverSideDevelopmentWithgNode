var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const User = require('./../models/users');
const passport = require('passport');
const authenticate = require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  User.register(
      new User({username: req.body.username}),
      req.body.password,
      (err, user) =>{
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err})
        } else {
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.firstname) {
            user.lastname = req.body.lastname;
          }
          user.save((err, user) =>{
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({err: err})
              return;
            }
            passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                status: 'Registration successful', success: true})
            })
          })
        }
      })
});
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("user id" + req.user._id);
  const token = authenticate.getToken({_id: req.user._id});
  console.log(`token: ${token}`);
  res.statusCode =200;
  res.setHeader('Content-Type','application/json');
  res.json({status: 'You are logged in', token: token,  success: true});
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
