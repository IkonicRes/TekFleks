// Import the necessary modules
const sequelize = require('../config/connection');
const seedTopics = require('./topic-seeds');
const seedUsers = require('./user-seeds'); 
const seedPosts = require('./post-seeds'); 
const seedComments = require('./comment-seeds'); 

// Define an asynchronous function to seed the database
const seedAll = async () => {

  // Synchronize the database and force it to drop and recreate all tables
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed the topics
  await seedTopics();
  console.log('\n----- TOPICS SEEDED -----\n');

  // Seed the users
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  // Seed the posts
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  // Seed the comments
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  // Exit the process
  process.exit(0);
};

// Call the seedAll function
seedAll();
