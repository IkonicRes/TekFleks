const router = require('express').Router();
const { Forum, Thread, Post, Comment } = require('../../models');

// GET all forums
router.get('/', async (req, res) => {
  try {
    const forumData = await Forum.findAll({
      include: Thread,
    });
    res.status(200).json(forumData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one forum by its ID
router.get('/:id', async (req, res) => {
  try {
    const forumData = await Forum.findByPk(req.params.id, {
      include: Thread,
    });
    res.status(200).json(forumData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST (create) a new forum
router.post('/', async (req, res) => {
  try {
    const forumData = await Forum.create(req.body);
    res.status(201).json(forumData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT (update) a forum
router.put('/:id', async (req, res) => {
    try {
      const [rowsUpdated] = await Forum.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'Forum not found.' });
      }
  
      const updatedForum = await Forum.findByPk(req.params.id, {
        include: Thread,
      });
      res.status(200).json(updatedForum);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
// DELETE a forum
router.delete('/:id', async (req, res) => {
try {
    await Forum.destroy({
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
