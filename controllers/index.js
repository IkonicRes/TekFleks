// Import the required modules
const router = require('express').Router();
const apiRoutes = require('./api');
const axios = require('axios');
const rendRouter = require('./rendered');
const authRoutes = require('./auth');

// Use the '/api' route and handle it with apiRoutes
router.use('/api', apiRoutes);

// Use the root route '/' and handle it with rendRouter
router.use('/', rendRouter);

// Use the '/auth' route and handle it with authRoutes
router.use('/auth', authRoutes);

// Export the router module
module.exports = router;
