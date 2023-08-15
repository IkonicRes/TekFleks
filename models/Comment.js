// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Creating a Comment class that extends the Model class
class Comment extends Model {}

// Initializing the Comment model with the defined attributes
Comment.init(
  {
    // Defining the comment_id attribute
    comment_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defining the created_at attribute
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Defining the comment_poster_id attribute
    comment_poster_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // Defining the likes attribute
    likeys: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // Defining the content attribute
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    // Configuring the model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

// Exporting the Comment model
module.exports = Comment;

