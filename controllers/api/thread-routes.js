const router = require('express').Router();
const { Thread, Post, Comment } = require('../../models');

// GET all threads
router.get('/', async (req, res) => {
  try {
    const threadData = await Thread.findAll({
      include: Post,
    });
    res.status(200).json(threadData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one thread by its ID
router.get('/:id', async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: Post,
    });
    res.status(200).json(threadData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST (create) a new thread
router.post('/', async (req, res) => {
  try {
    const threadData = await Thread.create(req.body);
    res.status(201).json(threadData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT (update) a thread
router.put('/:id', async (req, res) => {
    try {
        const [rowsUpdated] = await Thread.update(req.body, {
        where: {
            id: req.params.id,
        },
        });

        if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'Thread not found.' });
        }

        const updatedThread = await Thread.findByPk(req.params.id, {
        include: Post,
        });
        res.status(200).json(updatedThread);
    } catch (error) {
        res.status(400).json(error);
    }
});

// DELETE a thread
router.delete('/:id', async (req, res) => {
    try {
        await Thread.destroy({
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
