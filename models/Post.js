// Import the necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection
const sequelize = require('../config/connection.js');

// Create a Post class that extends the Sequelize Model class
class Post extends Model {}

// Initialize the Post model with its attributes
Post.init(
  {
    // Define the post_id attribute
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the poster_id attribute
    poster_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Define the likes attribute
    likes: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // Define the title attribute
    title: { 
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Define the text_content attribute
    text_content: { 
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // Define the media_url attribute
    media_url: { 
      type: DataTypes.STRING(255),
    },
    // Define the topic_id attribute
    topic_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'topic',
        key: 'topic_id',
      },
    },
  },
  // Define the model options
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Export the Post model
module.exports = Post;
