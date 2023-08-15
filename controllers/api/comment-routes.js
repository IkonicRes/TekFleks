const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
  try {
    // Find all comments in the database
    const commentData = await Comment.findAll();
    // Send the comments as a JSON response with a 200 status code
    res.status(200).json(commentData);
  } catch (error) {
    // If an error occurs, send the error as a JSON response with a 500 status code
    res.status(500).json(error);
  }
});

// GET one comment by its ID
router.get('/:id', async (req, res) => {
  try {
    // Find a comment in the database by its ID
    const commentData = await Comment.findByPk(req.params.id);
    // Send the comment as a JSON response with a 200 status code
    res.status(200).json(commentData);
  } catch (error) {
    // If an error occurs, send the error as a JSON response with a 500 status code
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new comment in the database using the request body
    // console.log("🚀 ~ file: comment-routes.js:35 ~ router.post ~ req.body.currentUser:", req.body)
    const newComment = await Comment.create({
      comment_poster_id: req.body.comment_poster_id,
      post_id: req.body.post_id,
      content: req.body.content
      // Add more attributes as needed from your Comment model
    });
    

    // Send the created comment as a JSON response with a 201 status code
    res.redirect(('/posts/' + req.body.post_id));
  } catch (error) {
    console.error('Error creating comment:', error);
    // If an error occurs, send the error as a JSON response with a 400 status code
    res.status(400).json({ error: 'Failed to create comment' });
  }
});

// PUT (update) a comment
router.put('/:id', async (req, res) => {
  try {
    // Update a comment in the database with the given ID and request body
    const [rowsUpdated] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no rows were updated, the comment was not found
    if (rowsUpdated === 0) {
      // Send a JSON response with a 404 status code indicating that the comment was not found
      return res.status(404).json({ error: 'Comment not found.' });
    }

    // Find the updated comment in the database
    const updatedComment = await Comment.findByPk(req.params.id);
    // Send the updated comment as a JSON response with a 200 status code
    res.status(200).json(updatedComment);
  } catch (error) {
    // If an error occurs, send the error as a JSON response with a 400 status code
    res.status(400).json(error);
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    // Delete a comment in the database with the given ID
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    // Send a 204 status code indicating that the comment was successfully deleted
    res.status(204).end();
  } catch (error) {
    // If an error occurs, send the error as a JSON response with a 500 status code
    res.status(500).json(error);
  }
});

// Export the router
module.exports = router;
