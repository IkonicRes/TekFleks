// Import the Express Router module
const router = require('express').Router();

// Import the user-routes module
const userRoutes = require('./user-routes');

// Import the post-routes module
const postRoutes = require('./post-routes');

// Import the comment-routes module
const commentRoutes = require('./comment-routes');

// Import the topic-routes module
const topicRoutes = require('./topic-routes');

// Use the userRoutes module for requests that start with '/users'
router.use('/users', userRoutes);

// Use the postRoutes module for requests that start with '/posts'
router.use('/posts', postRoutes);

// Use the commentRoutes module for requests that start with '/comments'
router.use('/comments', commentRoutes);

// Use the topicRoutes module for requests that start with '/topics'
router.use('/topics', topicRoutes);

// Export the router module
module.exports = router;
