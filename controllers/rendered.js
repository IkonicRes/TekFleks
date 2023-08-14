const router = require('express').Router();
const { Topic, Post, Comment, User } = require('../models');
const { Sequelize } = require('../config/connection')
const { isAuthenticated } = require('../utils/auth');

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, topics, post } = req.body;
    const selectedTopic = await Topic.findOne({ where: { name: topics } });

    if (selectedTopic) {
      await Post.create({
        title: title,
        poster_id: req.user.user_id, // Set the poster_id to user_id
        topic_id: selectedTopic.topic_id,
        text_content: post,
        // Other fields as needed
      });

      return res.redirect('/');
    }

    return res.status(400).send('Selected topic does not exist.');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('An error occurred while creating the post.');
  }
});

router.get('/profile', isAuthenticated, async (req, res) => {
  try
  {
    console.log('Is authenticated:', req.isAuthenticated());
    const userPosts = await Post.findAll({
      where: { poster_id: req.user.user_id }, // Fetch posts by the authenticated user
      include: [
        { model: User }, // Include the associated user data
        { model: Topic }, // Include the associated topic data
      ],
    });
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
    res.render('profile', { user: req.user.username, userPosts: userPosts, topics: topics });
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
      res.render('feed', { posts: posts, user: req.user.username, isAuthenticated: req.isAuthenticated() }); // Pass the authenticated user to the template
    } catch (error)
    {
      console.log(error);
      res.status(500).json(error);
    }
  });

  router.get('/addPost', isAuthenticated, async (req, res) => {
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

  router.post('/addPost', async (req, res) => {
    try {
      const { title, topics, post } = req.body;
  
      // Find the corresponding topic_id based on the selected topic name
      const selectedTopic = await Topic.findOne({ where: { name: topics } });
  
      if (selectedTopic) {
        // Create a new post in the database with the correct topic_id
        await Post.create({
          user_id: user_id,
          title: title,
          topic_id: selectedTopic.topic_id, // Set the correct topic_id here
          text_content: post,
          // Other fields as needed
        });
  
        // Redirect to home page after successful submission
        return res.redirect('/');
      }
  
      // Handle case where the selected topic doesn't exist
      return res.status(400).send('Selected topic does not exist.');
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('An error occurred while creating the post.');
    }
  });
  
  router.get('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        
        // Find the post and its associated comments
        const post = await Post.findByPk(postId, {
            include: [
                { model: Comment, include: User, order: [['date_created', 'ASC']] },
                User
            ]
        });

        // Retrieve the user ID from the cookie
        const currentUserId = await req.cookies.userId;
        console.log('Current user ID:', currentUserId); // Add this line for debugging

        if (!post) {
            return res.status(404).send('Post not found');
        }

        res.render('post', { currentUser: currentUserId, comments: post.comments, postTitle: post.title, post: post, textContent: post.text_content, postLikes: post.likes});
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('An error occurred while fetching the post.');
    }
});



  router.get('/topics', isAuthenticated, async (req, res) => {
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

  router.post('/posts/:postId/delete', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Check if the current user owns the post
        if (post.user_id === req.user.id) {
            await post.destroy();
            return res.redirect('/posts'); // Redirect to post list or other appropriate page
        } else {
            return res.status(403).send('Unauthorized');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('An error occurred while deleting the post.');
    }
});

  router.get('/about', isAuthenticated, (req, res) => {
    res.render('about');
  })


  module.exports = router;
