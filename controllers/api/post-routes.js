const router = require('express').Router();
const { Topic, Post, Comment } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
  try {
    let postData;
    if (req.query.sortBy === 'likes') {
      // Retrieve all posts with their associated comments and topics,
      // ordered by the number of likes in descending order
      postData = await Post.findAll({
        include: [{ model: Comment }, { model: Topic }],
        order: [['likes', 'DESC']],
      });
    } else {
      // Retrieve all posts with their associated comments
      postData = await Post.findAll({ include: Comment });
    }
    // Render the fetched post data as a JSON response
    res.status(200).json(postData);
  } catch (error) {
    // If there's an error, send a 500 status code and the error message as a JSON response
    res.status(500).json(error);
  }
});

// GET one post by its ID
router.get('/:id', async (req, res) => {
  try {
    // Find a post by its ID
    const postData = await Post.findByPk(req.params.id);
    // If the post is found, send a 200 status code and the post data as a JSON response
    res.status(200).json(postData);
  } catch (error) {
    // If there's an error, send a 500 status code and the error message as a JSON response
    res.status(500).json(error);
  }
});

// POST (create) a new post
router.post('/', async (req, res) => {
  try {
    // Assuming your authentication module sets up the user ID in the session
    const userId = req.user.user_id; // Adjust the property name based on your user model

    // Create a new post associated with the user's ID
    const postData = await Post.create({
      title: req.body.title,
      text_content: req.body.text_content,
      media_url: req.body.media_url,
      topic_id: req.body.topic_id,
      poster_id: userId, // Assuming your Post model's field name is "poster_id"
    });

    // Redirect to the "feed" page after successful post creation
    res.redirect('/feed'); // Adjust the route path as needed
  } catch (error) {
    // If there's an error, send a 400 status code and the error message as a JSON response
    res.status(400).json(error);
  }
});

// PUT (update) a post
router.put('/:id', async (req, res) => {
  try {
    // Update the post with the given ID using the request body
    const [rowsUpdated] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no rows were updated, return a 404 status code and an error message
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    // Retrieve the updated post by its ID
    const updatedPost = await Post.findByPk(req.params.id);
    // Send a 200 status code and the updated post data as a JSON response
    res.status(200).json(updatedPost);
  } catch (error) {
    // If there's an error, send a 400 status code and the error message as a JSON response
    res.status(400).json(error);
  }
});
router.post('/:id/del', async (req, res) => {
  try {
    // Update the post with the given ID using the request body
    await Post.destroy( {
      where: {
        post_id: req.params.id,
      },
    });
    // Retrieve the updated post by its ID
    // Send a 200 status code and the updated post data as a JSON response
    return res.redirect('/');
  } catch (error) {
    console.log(error)
    // If there's an error, send a 400 status code and the error message as a JSON response
    res.status(400).json(error);
  }
});

router.post('/:id/new', async (req, res) => {
  try {
    // Update the post with the given ID using the request body
    const updateOptions = {
      where: {
        post_id: parseInt(req.params.id),
      },
    };
    
    console.log('Update Options:', updateOptions);
    console.log
    const post = await Post.findByPk(req.params.id);
    post.text_content = req.body.text_content
    await post.save()
    return res.redirect('/posts/' + req.params.id);
    // Retrieve the updated post by its ID
    // Send a 200 status code and the updated post data as a JSON response
  } catch (error) {
    console.log(error)
    // If there's an error, send a 400 status code and the error message as a JSON response
    res.status(400).json(error);
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    // Delete the post with the given ID
    await Post.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    // Send a 204 status code (No Content
    res.status(204).end();
  } catch (error) {
     // If there's an error, send a 500 status code and the error message as a JSON response
    res.status(500).json(error);
  }
});
// Export the router for use in other modules
module.exports = router;
