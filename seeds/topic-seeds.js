const { Topic } = require('../models');

const topicData = [
  {
    name: 'Programming Discussion',
  },
  {
    name: 'General Chat',
  },
  {
    name: 'New Technologies'
  },
  {
    name: 'AI Development'
  }
  // Add more topic data as needed
];

const seedTopics = async () => {
  try {
    await Topic.bulkCreate(topicData);
    console.log('Topics seeded successfully.');
  } catch (error) {
    console.error('Error seeding Topics:', error);
  }
};

module.exports = seedTopics;