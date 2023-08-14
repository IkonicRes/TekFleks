const router = require('express').Router();
const { Topic, Post, Comment } = require('../../models');

// GET all topics
router.get('/', async (req, res) => {
  try {
    const topicData = await Topic.findAll({
      include: Post,
    });
    res.status(200).json(topicData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET one topic by its ID
router.get('/:id', async (req, res) => {
  try {
    const topicData = await Topic.findByPk(req.params.id, {
      include: Post,
    });
    res.status(200).json(topicData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST (create) a new topic
router.post('/', async (req, res) => {
  try {
    const topicData = await Topic.create(req.body);
    res.status(201).json(topicData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT (update) a topic
router.put('/:id', async (req, res) => {
    try {
      const [rowsUpdated] = await Topic.update(req.body, {
        where: {
          topic_id: req.params.id,
        },
      });
  
      if (rowsUpdated === 0) {
        return res.status(404).json({ error: 'Topic not found.' });
      }
  
      const updatedTopic = await Topic.findByPk(req.params.id, {
        include: Thread,
      });
      res.status(200).json(updatedTopic);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
// DELETE a topic
router.delete('/:id', async (req, res) => {
try {
    await Topic.destroy({
    where: {
        topic_id: req.params.id,
    },
    });
    res.status(204).end();
} catch (error) {
    res.status(500).json(error);
}
});

module.exports = router;
