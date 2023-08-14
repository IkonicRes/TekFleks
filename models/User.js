// Importing the necessary modules from the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Importing the connection object from the '../config/connection.js' file
const sequelize = require('../config/connection.js');

// Defining a User class that extends the Model class provided by Sequelize
class User extends Model { }

// Initializing the User model with the following attributes
User.init(
  {
    // The user_id attribute is an auto-incrementing integer, not null, and is the primary key
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // The username attribute is a string of maximum length 32, not null
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    // The password attribute is a string of maximum length 64, not null
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    // The profile_pic_url attribute is a string of maximum length 255, with a default value
    profile_pic_url: {
      type: DataTypes.STRING(255),
      defaultValue: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    }
  },
  {
    // Passing the sequelize connection object
    sequelize,
    // Disabling the timestamps (createdAt and updatedAt) columns
    timestamps: false,
    // Setting the table name to be the same as the model name
    freezeTableName: true,
    // Using underscored naming convention for the table columns
    underscored: true,
    // Setting the model name to 'user'
    modelName: 'user',
  }
);

// Exporting the User model
module.exports = User;
