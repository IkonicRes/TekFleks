const { Topic } = require('../models');

const topicData = [
  {
    name: 'Programming Discussion',
  },
  {
    name: 'General Chat',
  },
  // Add more topic data as needed
];

const seedTopics = async () => {
  try {
    console.log(Topic)
    await Topic.bulkCreate(topicData);
    console.log('Topics seeded successfully.');
  } catch (error) {
    console.error('Error seeding Topics:', error);
  }
};

module.exports = seedTopics;