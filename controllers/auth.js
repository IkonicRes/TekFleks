const express = require('express');
const {passport} = require('../utils/auth');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
// Login route
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') }); // Render the login page with the error message
});

router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') }); // Render the signup page with the error message
  });

router.post('/signup', async (req, res) => {
try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
    req.flash('error', 'Username already exists. Please choose a different username.');
    return res.redirect('/signup');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = await User.create({
    username,
    password: hashedPassword,
    profile_pic_url: 'https://www.gravatar.com/avatar/default-avatar-image',
    });

    req.login(newUser, (err) => {
      if (err) throw err;
      return res.redirect('/');      
    });

    // Redirect to the login page after successful signup
} catch (error) {
    console.error('Error during signup:', error);
    req.flash('error', 'An error occurred during signup. Please try again.');
    res.redirect('/signup');
}
});

// Handle login POST request
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true  // Flash the error message
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout(); // Logout the user
    res.redirect('/login'); // Redirect to the login page
  });
  
module.exports = router;