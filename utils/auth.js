// Import required dependencies
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Import LocalStrategy from passport module
const LocalStrategy = require('passport-local').Strategy;

// Configure passport to use LocalStrategy for authentication
passport.use(new LocalStrategy(
  // Define the authentication strategy
  async (username, password, done) => {
    try {
      // Find the user in the database based on the provided username
      const user = await User.findOne({ where: { username: username } });

      // If the user doesn't exist, return an error
      if (!user) {
        console.log('incorrect username')
        return done(null, false, { message: 'Incorrect username.' });
      }

      // If the password is incorrect, return an error
      if (!bcrypt.compareSync(password, user.password)) {
        console.log("'incorrect password'🚀 ~ file: auth.js:18 ~ password, user.password:", password, user.password)
        return done(null, false, { message: 'Incorrect password.' });
      }

      // If the username and password are correct, return the user
      return done(null, user);
    } catch (error) {
      // If an error occurs, return the error
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  // Serialize the user by storing the user_id in the session
  done(null, user.user_id);
});

// Deserialize user from session
passport.deserializeUser(async (user_id, done) => {
  try {
    // Find the user in the database based on the user_id stored in the session
    const user = await User.findByPk(user_id);
    // Return the user
    done(null, user);
  } catch (error) {
    // If an error occurs, return the error
    done(error);
  }
});

// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, log a message and proceed to the next middleware
    console.log('User is authenticated');
    return next();
  }
  // If the user is not authenticated, redirect to the login page
  res.redirect('/login');
};

// Export the configured passport instance and the isAuthenticated middleware
module.exports = { passport, isAuthenticated };
