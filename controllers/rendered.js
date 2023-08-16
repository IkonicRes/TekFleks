const router = require('express').Router();
const { Topic, Post, Comment, User, Like } = require('../models');
const { Sequelize } = require('../config/connection')
const { isAuthenticated } = require('../utils/auth');

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, topics, post } = req.body;
    const selectedTopic = await Topic.findOne({ where: { name: topics } });

    if (selectedTopic) {
      const newestPost = await Post.create({
        title: title,
        poster_id: req.user.user_id, // Set the poster_id to user_id
        topic_id: selectedTopic.topic_id,
        text_content: post,
        // Other fields as needed
      });

      return res.redirect(('/posts/' + newestPost.post_id));
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
    // console.log('Is authenticated:', req.isAuthenticated());
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
          { model: Comment, order: [['likeys', 'DESC']] }, // Order comments by likes to get top comment
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
  router.get('/', async (req, res) => {
    try
    {
      // Fetch random posts along with their comments and topic information
      const postsData = await Post.findAll({
        include: [
          { model: Comment },
          { model: Topic },
          { model: User },
        ],
        order: Sequelize.literal('RAND()'), // Fetch random posts
        limit: 10, // Limit to a certain number of posts
      });
      let result;
      const posts = postsData.map((post) => post.get({ plain: true }));
      if (req.user){
      result = { posts: posts, user: req.user.username }
      }
      else {
      result = { posts: posts }
      }
      res.render('feed', result ); // Pass the authenticated user to the template
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
          { model: Comment, order: [['likeys', 'DESC']] }, // Order comments by likes to get top comment
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
    
    res.render('addPost', { topics: topics, user: req.user.username, userId: req.user.user_id });
  })


  router.post('/addPost', async (req, res) => {
    try {
      const { title, topics, post } = req.body;
  
      // Find the corresponding topic_id based on the selected topic name
      const selectedTopic = await Topic.findOne({ where: { name: topics } });
  
      if (selectedTopic) {
        // Create a new post in the database with the correct topic_id
        newestPost = await Post.create({
          user_id: user_id,
          title: title,
          topic_id: selectedTopic.topic_id, // Set the correct topic_id here
          text_content: post,
          // Other fields as needed
        });
  // console.log('WHYYYYYYYYY')
        // Redirect to home page after successful submission
        return res.redirect(('/posts/' + newestPost.post_id));
      }
  
      // Handle case where the selected topic doesn't exist
      return res.status(400).send('Selected topic does not exist.');
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('An error occurred while creating the post.');
    }
  });
  


  router.get('/posts/:postId', isAuthenticated, async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Find the post and its associated comments
      const post = await Post.findByPk(postId, {
        include: [
          { model: Comment, include: [{model: User}], order: [['created_at', 'ASC']] },
          { model: User },
        ],
      });
  
      // Convert poster_id to number
      // const posterIdNumber = Number(post.dataValues.poster_id);
  
      // const allUsers = await User.findAll(); // Fetch all users from your database
      // Populate the userMap
      const currentUserId = await req.cookies.userId;
      // const userMap = allUsers.reduce((map, user) => {
      //   map[user.user_id] = { username: user.username };
      //     return map;
      //   }, {});
      // const posterId = post.poster_id;
      const plainPost = post.get({ plain: true });
      console.log("🚀 ~ file: rendered.js:185 ~ router.get ~ plainPost:", plainPost)
      // const poster = userMap[posterId]; 
      // // Render the 'post' view with necessary data
      // if (poster) {
      //   const posterUsername = poster.username;
      //   console.log('Poster username:', posterUsername);
      // } else {
      //   console.log('Poster not found in user map');
      // }
      res.render('post', {
          // date: post.dataValues.created_at,
          // userMap: userMap,
          currentUser: currentUserId,
          // comments: post.comments, // Make sure post.comments is an array
          // postTitle: post.title,
          post: plainPost,
          // textContent: post.text_content,
          // postLikes: post.likeys,
          // posterName: posterUsername, // Pass the converted number to the template
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
    }
  });
  
  
  router.get('/posts/:postId/edit', isAuthenticated, async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId, {
      include: [
        { model: Comment, include: [{model: User}], order: [['created_at', 'ASC']] },
        { model: User },
      ],
      
    });
    const currentUserId = await req.cookies.userId;
    const plainPost = post.get({ plain: true });
    res.render('editPost', { currentUser: currentUserId, post: plainPost});
  })

  

  router.post('/posts/:postId/like', isAuthenticated, async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user.user_id;
      // console.log("🚀 ~ file: rendered.js:209 ~ router.post ~ userId:", userId)
      const commentId = req.query.commentId; // Use query parameter to differentiate post and comment likes
      const post = await Post.findByPk(postId, {
        include: [
          { model: Comment, include: User, order: [['created_at', 'ASC']] },
          User,
        ],
      });
      const allUsers = await User.findAll(); // Fetch all users from your database
      // Populate the userMap
      const currentUserId = await req.cookies.userId;
      const userMap = allUsers.reduce((map, user) => {
          map[user.user_id] = { username: user.username };
          return map;
      }, {});
      // Check if the user has already liked the post or comment
      const existingLike = await Like.findOne({
        where: {
          user_id: userId,
          post_id: postId,
        },
      });
  
      if (existingLike) {
        const errorMessage = 'You have already liked this.';
        
        return res.render('post', { errorMessage,           
          date: post.dataValues.created_at,
          userMap: userMap,
          currentUser: currentUserId,
          comments: post.comments, // Make sure post.comments is an array
          postTitle: post.title,
          post: post,
          textContent: post.text_content,
          postLikes: post.likeys});
      }
  
      // Increment the post's or comment's like count
      const likeIncrementData = commentId ? { comment_id: commentId } : { post_id: postId };
      const [updatedRows] = await Post.increment('likes', { where: likeIncrementData });
  
      if (updatedRows === 0) {
        // This means the post or comment to be liked does not exist
        const errorMessage = 'The post or comment you are trying to like does not exist.';
        return res.render('post', { errorMessage,           
          date: post.dataValues.created_at,
          userMap: userMap,
          currentUser: currentUserId,
          comments: post.comments, // Make sure post.comments is an array
          postTitle: post.title,
          post: post,
          textContent: post.text_content,
          postLikes: post.likeys});
      } else if (updatedRows > 1) {
        // This indicates an unexpected situation where more than one row was updated
        const errorMessage = 'An unexpected error occurred while updating the like count.';
        return res.render('post', { errorMessage,           
          date: post.dataValues.created_at,
          userMap: userMap,
          currentUser: currentUserId,
          comments: post.comments, // Make sure post.comments is an array
          postTitle: post.title,
          post: post,
          textContent: post.text_content,
          postLikes: post.likeys});
      }
      
  
      // Create a new Like record to track the user's like
      await Like.create({
        is_comment: !!commentId,
        user_id: userId,
        post_id: commentId ? null : postId,
        comment_id: commentId ? commentId : null,
      });
  
      // Redirect back to the same post route after processing the like
      return res.render('post', { errorMessage,           
        date: post.dataValues.created_at,
        userMap: userMap,
        currentUser: currentUserId,
        comments: post.comments, // Make sure post.comments is an array
        postTitle: post.title,
        post: post,
        textContent: post.text_content,
        postLikes: post.likeys});;
    } catch (error) {
      console.error('Error adding like:', error);
      return res.render('post', { errorMessage,           
        date: post.dataValues.created_at,
        userMap: userMap,
        currentUser: currentUserId,
        comments: post.comments, // Make sure post.comments is an array
        postTitle: post.title,
        post: post,
        textContent: post.text_content,
        postLikes: post.likeys});
    }
  });
  
  


  router.get('/topics', isAuthenticated, async (req, res) => {
    try
    {
      let topicData = await Topic.findAll({
        include: {
          model: Post,
          include: [
            { model: Comment, order: [['likeys', 'DESC']] }, // Order comments by likes to get top comment
            { model: User },
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

  router.get('/about', (req, res) => {
    res.render('about');
  })


  module.exports = router;
