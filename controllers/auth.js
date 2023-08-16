// Import the necessary modules and libraries
const express = require('express'); // Express.js framework
const {passport} = require('../utils/auth'); // Passport.js for authentication
const router = express.Router(); // Create a router object
const {User} = require('../models'); // Import the User model
const bcrypt = require('bcrypt'); // Library for password hashing

// Login route
router.get('/login', (req, res) => {
  const backURL = (req.header('Referer') || '/')
  res.render('login', { message: req.flash('error'), backURL }); // Render the login page with the error message (if any)
});

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') }); // Render the signup page with the error message (if any)
  });

// Signup form submission route
router.post('/signup', async (req, res) => {
try {
    const { username, password } = req.body; // Get the username and password from the request body

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
    req.flash('error', 'Username already exists. Please choose a different username.'); // Set flash message for error
    return res.redirect('/signup'); // Redirect to the signup page with error message
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt of 10 rounds

    // Create a new user with hashed password
    const newUser = await User.create({
    username,
    password: hashedPassword,
    profile_pic_url: 'https://www.gravatar.com/avatar/default-avatar-image', // Set a default profile picture URL
    });

    // Log in the new user
    req.login(newUser, (err) => {
      if (err) throw err;
      return res.redirect('/'); // Redirect to the homepage after successful signup
    });

} catch (error) {
    console.error('Error during signup:', error);
    req.flash('error', 'An error occurred during signup. Please try again.'); // Set flash message for error
    res.redirect('/signup'); // Redirect to the signup page with error message
}
});

// Login form submission route
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login', // Redirect to the login page if authentication fails
  failureFlash: true  // Flash the error message
}), async (req, res) => {
  // Successful authentication
  const userId = req.user.user_id; // Get the user's ID from the authenticated user object 
  const backUrl = req.body.backURL

  res.cookie('userId', userId); // Set the 'userId' cookie

  res.redirect(backUrl); // Redirect to the user's dashboard or other page
});

// Logout route
router.get('/logout', function(req, res) {
  req.logout(); // This will remove the user's session and passport user property
  res.redirect('/login'); // Redirect to the login page after successful logout
});

module.exports = router; // Export the router for use in other files
