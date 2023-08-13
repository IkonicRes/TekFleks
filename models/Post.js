const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    poster_id: { // Add the poster_id field
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: { // Add the likes field
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    text_content: { //Add the text_content field
      type: DataTypes.TEXT,
    },
    media_url: { //Add the media_url field
      type: DataTypes.STRING(255),
    },
    topic_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'topic',
        key: 'topic_id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
