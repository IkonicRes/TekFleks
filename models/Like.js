// Importing necessary modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Creating a Comment class that extends the Model class
class Like extends Model {}

// Initializing the Like model with the defined attributes
Like.init(
  {
    // Defining the like_id attribute
    like_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defining if its a comment or not
    is_comment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Defining the user_id attribute
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    // Configuring the model options
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
  }
);

// Exporting the Like model
module.exports = Like;

