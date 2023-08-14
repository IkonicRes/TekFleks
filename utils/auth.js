// auth/auth.js

const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        console.log('incorrect username')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        console.log("'incorrect password'🚀 ~ file: auth.js:18 ~ password, user.password:", password, user.password)
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

// Deserialize user from session
passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await User.findByPk(user_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }
  res.redirect('/login'); // Redirect to the login page if not authenticated
};

module.exports = { passport, isAuthenticated };


