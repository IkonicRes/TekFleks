const router = require('express').Router();
const { Comment } = require('../../models');
const { isAuthenticated } = require('../../utils/auth');
const { User, Like } = require('../../models');
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

router.post('/:id/like',  async (req, res) => {
  try {
    let comment_Id = req.params.id;
    let comment = await Comment.findByPk(comment_Id, {
      include: [
        { model: Like, include: { model: User } },
        { model: User },
      ],
    });
    
    let plainComment = comment.get({ plain: true });
    let currentUserId = await req.cookies.userId;
    commentLikes = plainComment.likes;
    console.log('🚀 ~ file: rendered.js:193 ~ router.post ~ userId:', commentLikes)
    // console.log("🚀 ~ file: rendered.js:209 ~ router.post ~ userId:", userId)
    // Populate the userMap
    // Check if the user has already liked the post or comment
    const existingLike = commentLikes.find(like => like.user.user_id == currentUserId);
    console.log('existingLike:', existingLike);
    const likeIncrementData = comment_Id ? { comment_id: comment_Id } : { post_id: postId };
    if (existingLike) {
      const errorMessage = 'You have already liked this.';
      console.log(errorMessage)
      await Like.destroy({
        where: {
          like_id: existingLike.like_id,
        },
      });
      const [updatedRows] = await Comment.decrement('likeys', { by: 1, where: likeIncrementData });
      return res.redirect('/posts/' + req.body.post_id + '#Comment-' + comment_Id);      
    }
    const newLike = await Like.create({
      comment_id: comment_Id,
      user_id: req.cookies.userId, // Assuming you're using cookies to store user information
    });
    // Increment the post's or comment's like count
    const [updatedRows] = await Comment.increment('likeys', { by: 1, where: likeIncrementData });

    if (updatedRows === 0) {
      // This means the post or comment to be liked does not exist
      const errorMessage = 'The post or comment you are trying to like does not exist.';
      return res.redirect('/posts/' + req.body.post_id + '#Comment-' + comment_Id);   
    } else if (updatedRows > 1) {
      // This indicates an unexpected situation where more than one row was updated
      const errorMessage = 'An unexpected error occurred while updating the like count.';
      return console.log(errorMessage)
    }
    return res.redirect('/posts/' + req.body.post_id + '#Comment-' + comment_Id);   

  } catch (error) {
    console.error('Error adding like:', error);     
  }
});

router.post('/:id/new', async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    console.log('Requested Comment ID:', commentId);

    // Find the comment by its ID
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      console.log('Comment not found.');
      return res.status(404).json({ error: 'Comment not found.' });
    }
    console.log('comment:', req.body);
    comment.content = req.body.text_content;
    await comment.save();
    // Redirect to the post with the updated comment scrolled into view
    return res.redirect('/posts/' + req.body.post_id + '#Comment-' + commentId);
  } catch (error) {
    console.log('Error:', error);
    res.status(400).json(error);
  }
});



router.post('/:id/del', async (req, res) => {
  try {
    // Update the post with the given ID using the request body
    await Comment.destroy( {
      where: {
        comment_id: req.params.id,
      },
    });
    // Retrieve the updated post by its ID
    // Send a 200 status code and the updated post data as a JSON response
    return res.redirect('/posts/' + req.body.post_id);
  } catch (error) {
    console.log(error)
    // If there's an error, send a 400 status code and the error message as a JSON response
    res.status(400).json(error);
  }
});

// Export the router
module.exports = router;
