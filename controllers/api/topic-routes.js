const router = require('express').Router();
const { Topic, Post, Comment } = require('../../models');

// Define a router for handling the API endpoints related to topics

// GET all topics
router.get('/', async (req, res) => {
  try {
    // Retrieve all topics from the database, including their associated posts
    const topicData = await Topic.findAll({
      include: Post,
    });
    // Send the retrieved topic data as a response
    res.status(200).json(topicData);
  } catch (error) {
    // If there was an error, send a 500 status code and the error message as a response
    res.status(500).json(error);
  }
});

// GET one topic by its ID
router.get('/:id', async (req, res) => {
  try {
    // Retrieve a topic with the specified ID from the database, including its associated posts
    const topicData = await Topic.findByPk(req.params.id, {
      include: Post,
    });
    // If a topic with the specified ID was found, send it as a response
    // Otherwise, send a 404 status code with an error message
    res.status(200).json(topicData || { error: 'Topic not found.' });
  } catch (error) {
    // If there was an error, send a 500 status code and the error message as a response
    res.status(500).json(error);
  }
});

// POST (create) a new topic
router.post('/', async (req, res) => {
  try {
    // Create a new topic using the data provided in the request body
    const topicData = await Topic.create(req.body);
    // Send the created topic as a response
    res.status(201).json(topicData);
  } catch (error) {
    // If there was an error, send a 400 status code and the error message as a response
    res.status(400).json(error);
  }
});

// PUT (update) a topic
router.put('/:id', async (req, res) => {
  try {
    // Update the topic with the specified ID using the data provided in the request body
    const [rowsUpdated] = await Topic.update(req.body, {
      where: {
        topic_id: req.params.id,
      },
    });

    // If no rows were updated (topic not found), send a 404 status code with an error message
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'Topic not found.' });
    }

    // Retrieve the updated topic from the database, including its associated posts
    const updatedTopic = await Topic.findByPk(req.params.id, {
      include: Post,
    });
    // Send the updated topic as a response
    res.status(200).json(updatedTopic);
  } catch (error) {
    // If there was an error, send a 400 status code and the error message as a response
    res.status(400).json(error);
  }
});

// DELETE a topic
router.delete('/:id', async (req, res) => {
  try {
    // Delete the topic with the specified ID from the database
    await Topic.destroy({
      where: {
        topic_id: req.params.id,
      },
    });
    // Send a 204 status code (No Content) to indicate successful deletion
    res.status(204).end();
  } catch (error) {
    // If there was an error, send a 500 status code and the error message as a response
    res.status(500).json(error);
  }
});

// Export the router for use in other modules
module.exports = router;
