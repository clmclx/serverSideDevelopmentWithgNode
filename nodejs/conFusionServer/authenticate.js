const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config  =require('./config');


// define method that will be used to generate the token
exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};


// options when checking the token in requests
 const opts = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: config.secretKey
 };

 // used to retrieved the token
 exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
     console.log(`jwt payload ${jwt_payload}`);
     User.findOne({_id: jwt_payload._id}, (err, user) => {
         if (err) {
             return done(err, false);
         } else {
             if (user) {
                 return done(null, user);
             } else {
                 return done(null, false);
             }
         }
     })

 }));

 // user to verify the user
exports.verifyUser = passport.authenticate('jwt', {session: false});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());