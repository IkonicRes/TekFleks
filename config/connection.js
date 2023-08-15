// Load the dotenv module to read .env file
require('dotenv').config();

// Import the Sequelize library
const Sequelize = require('sequelize');

// Create a Sequelize instance with the database configuration
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL) // Use JawsDB URL if available
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST, // Set the database host
      dialect: 'postgres', // Set the database dialect to MySQL
      dialectOptions: {
        ssl: { // Require SSL connection
          rejectUnauthorized: false, // Accept self-signed certificates (for Heroku)
        },
        decimalNumbers: true, // Enable support for decimal numbers
      },
    });

// Export the sequelize instance for other modules to use
module.exports = sequelize;
