const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds'); // Update with actual path to user-seeds
const seedPosts = require('./post-seeds'); // Update with actual path to post-seeds
const seedComments = require('./comment-seeds'); // Update with actual path to comment-seeds

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();