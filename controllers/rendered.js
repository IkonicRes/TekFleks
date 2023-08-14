const router = require('express').Router();
const { Topic, Post, Comment, User } = require('../models');
const { Sequelize } = require('../config/connection')
const { isAuthenticated } = require('../utils/auth');


router.get('/profile', isAuthenticated, async (req, res) => {
  try
  {
    console.log('Is authenticated:', req.isAuthenticated());
    const userPosts = await Post.findAll({
      where: { user_id: req.user.user_id }, // Fetch posts by the authenticated user
    });;
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

    let topics = await topicData.map((topic) => {
      const plainTopic = topic.get({ plain: true });

      // For each post, find the top comment (if any)
      plainTopic.posts.forEach((post) => {
        if (post.comments.length > 0)
        {
          post.topComment = post.comments[0]; // Assign the top comment to the post
        }
      });

      return plainTopic;
    });
    res.render('profile', { user: req.user, userPosts: userPosts, topics: topics });
  } catch (error)
  {
    console.error('Error fetching user profile:', error);
    res.status(500).send('An error occurred while fetching the profile.');
  }
});
  router.get('/', isAuthenticated, async (req, res) => {
    try
    {
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
    } catch (error)
    {
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
        if (post.comments.length > 0)
        {
          post.topComment = post.comments[0]; // Assign the top comment to the post
        }
      });

      return plainTopic;
    });

    res.render('addPost', { topics: topics, user: req.user.username });
  })

  router.get('/topics', async (req, res) => {
    try
    {
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
          if (post.comments.length > 0)
          {
            post.topComment = post.comments[0]; // Assign the top comment to the post
          }
        });

        return plainTopic;
      });

      res.render('topics', { topics: topics, user: req.user });
    } catch (error)
    {
      console.log(error);
      res.status(500).json(error);
    }
  });


  module.exports = router;
