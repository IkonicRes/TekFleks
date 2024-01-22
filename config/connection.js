// Load the dotenv module to read .env file
require('dotenv').config();

// Import the Sequelize library
const Sequelize = require('sequelize');

// Create a Sequelize instance with the database configuration
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL) // Use the CR DB URL if available
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST, // Set the database host
      dialect: 'mysql', // Set the database dialect to MySQL
      dialectOptions: {
        decimalNumbers: true, // Enable support for decimal numbers
      },
    });

// Export the sequelize instance for other modules to use
module.exports = sequelize;
