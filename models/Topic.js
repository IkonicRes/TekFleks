// Importing the necessary modules from Sequelize library
const { Model, DataTypes } = require('sequelize');

// Importing the connection configuration from '../config/connection.js' file
const sequelize = require('../config/connection.js');

// Defining the Topic class that extends the Model class provided by Sequelize
class Topic extends Model { }

// Initializing the Topic model with the attributes and options
Topic.init(
  {
    // Defining the topic_id attribute with the data type INTEGER.UNSIGNED
    // allowNull set to false means this attribute is required
    // primaryKey set to true means this attribute is the primary key
    // autoIncrement set to true means this attribute will auto-increment
    topic_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defining the name attribute with the data type STRING(64)
    // allowNull set to false means this attribute is required
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  },
  {
    // Passing the sequelize connection object
    sequelize,
    // timestamps set to false means the model won't include timestamp columns
    timestamps: false,
    // freezeTableName set to true means the table name won't be pluralized
    freezeTableName: true,
    // underscored set to true means the column names will be snake_case instead of camelCase
    underscored: true,
    // modelName set to 'topic' means the table name will be 'topics'
    modelName: 'topic',
  }
);

// Exporting the Topic model
module.exports = Topic;
