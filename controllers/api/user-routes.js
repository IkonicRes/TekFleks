// Import the necessary modules
const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); // Import User, Post, and Comment models

// Define the `/api/users` endpoint for handling GET requests
router.get('/', async (req, res) => {
  try {
    // Retrieve all users and include their associated posts and comments

    console.log('hello')

    const userData = await User.findAll({
      include: [
        { model: Post, include: Comment }, // Include associated posts and comments
        // Include standalone associated comments
      ]
    });

  console.log(userData)

    res.status(200).json(userData);
  } catch (err) {
    console.error(err)
    // Handle any errors that occur during the retrieval
    res.status(500).json(err);
  }
});

// Define the `/api/users/:user_id` endpoint for handling GET requests
router.get('/:user_id', async (req, res) => {
  // Find a user by their `user_id` value and include their associated posts and comments
  try {
    const userData = await User.findByPk(req.params.user_id, {
      include: [
        { model: Post, include: Comment }, // Include associated posts and comments
        Comment // Include standalone associated comments
      ]
    })
    res.status(200).json(userData);
  } catch(err) {
    // Handle any errors that occur during the retrieval
    res.status(500).json(err);
  }
});

// Define the `/api/users` endpoint for handling POST requests
router.post('/', async (req, res) => {
  // Create a new user with the data provided in the request body
  try {
    const userData = await User.create(req.body)
    res.status(201).json(userData);
  } catch (err) {
    // Handle any errors that occur during the creation
    res.status(500).json(err);
  }
});

// Define the `/api/users/:user_id` endpoint for handling PUT requests
router.put('/:user_id', async (req, res) => {
  // Update a user with the provided `user_id` using the data from the request body
  try {
    // Perform the update operation
    const [rowsUpdated] = await User.update(req.body, {
      where: {
        id: req.params.user_id,
      },
    });

    // Check if any rows were actually updated
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Fetch the updated user data from the database
    const updatedUser = await User.findByPk(req.params.user_id);

    // Respond with the updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    // Handle any errors that occur during the update
    res.status(500).json(err);
  }
});

// Define the `/api/users/:user_id` endpoint for handling DELETE requests
router.delete('/:user_id', async (req, res) => {
  // Delete a user with the provided `user_id`
  try {
    await User.destroy({
      where: {
        id: req.params.user_id,
      },
    });
    res.status(204).end();
  } catch (err) {
    // Handle any errors that occur during the deletion
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
