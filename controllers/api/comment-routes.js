const router = require('express').Router();
const { Comment } = require('../../models');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one comment by its ID
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST (create) a new comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(201).json(commentData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT (update) a comment
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Comment not found.' });
    }

    const updatedComment = await Comment.findByPk(req.params.id);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

// Export the router
module.exports = router;
