const router = require('express').Router();
const { Topic, Post, Comment } = require('../models');
const { Sequelize } = require('../config/connection')
const { isAuthenticated } = require('../utils/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
      // Fetch random posts along with their comments and topic information
      const postsData = await Post.findAll({
        include: [
          { model: Comment },
          { model: Topic },
        ],
        order: Sequelize.literal('RAND()'), // Fetch random posts
        limit: 10, // Limit to a certain number of posts
      });
  
      const posts = postsData.map((post) => post.get({ plain: true }));
      console.log(req.user.username)
      res.render('feed', { posts: posts, user: req.user.username }); // Pass the authenticated user to the template
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });

router.get('/addPost', async (req, res) => {
  let topicData = await Topic.findAll({
    include: {
        model: Post,
        include: [
            { model: Comment, order: [['likes', 'DESC']] }, // Order comments by likes to get top comment
            // Include any other necessary associations
        ],
    },
    order: [['topic_id', 'ASC']], // You can adjust the order as needed
});

let topics = topicData.map((topic) => {
    const plainTopic = topic.get({ plain: true });

    // For each post, find the top comment (if any)
    plainTopic.posts.forEach((post) => {
        if (post.comments.length > 0) {
            post.topComment = post.comments[0]; // Assign the top comment to the post
        }
    });

    return plainTopic;
});

  res.render('addPost', { topics: topics, user: req.user.username });
})

router.get('/topics', async (req, res) => {
  try {
      let topicData = await Topic.findAll({
          include: {
              model: Post,
              include: [
                  { model: Comment, order: [['likes', 'DESC']] }, // Order comments by likes to get top comment
                  // Include any other necessary associations
              ],
          },
          order: [['topic_id', 'ASC']], // You can adjust the order as needed
      });

      let topics = topicData.map((topic) => {
          const plainTopic = topic.get({ plain: true });

          // For each post, find the top comment (if any)
          plainTopic.posts.forEach((post) => {
              if (post.comments.length > 0) {
                  post.topComment = post.comments[0]; // Assign the top comment to the post
              }
          });

          return plainTopic;
      });

      res.render('topics', { topics: topics });
  } catch (error) {
      console.log(error);
      res.status(500).json(error);
  }
});


module.exports = router;
