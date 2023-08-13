const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes'); 
const commentRoutes = require('./comment-routes');
const topicRoutes = require('./topic-routes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/topics', topicRoutes);



module.exports = router;
