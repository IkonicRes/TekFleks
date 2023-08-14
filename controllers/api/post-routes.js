const router = require('express').Router();
const { Topic, Post, Comment } = require('../../models');


// GET all posts
router.get('/', async (req, res) => {
  try {
    let postData;
    if (req.query.sortBy === 'likes') {
      postData = await Post.findAll({
        include: [{Comment, Topic}],
        order: [['likes', 'DESC']],
      });
    } else {
      postData = await Post.findAll({
        include: Comment,
      });
    }
    res.render(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});




// GET one post by its ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    res.status(200).json(postData);
  } catch (error) {
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
      ...req.body,
      poster_id: userId, // Assuming your Post model's field name is "poster_id"
    });

    // Redirect to the "feed" page after successful post creation
    res.redirect('/feed'); // Adjust the route path as needed
  } catch (error) {
    res.status(400).json(error);
  }
});


// PUT (update) a post
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const updatedPost = await Post.findByPk(req.params.id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
