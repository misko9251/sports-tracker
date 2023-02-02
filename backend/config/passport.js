const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(
      new localStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false, {message: 'Email not found'});
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Password incorrect'});
            }
          });
        });
      })
    );
    
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });
  };