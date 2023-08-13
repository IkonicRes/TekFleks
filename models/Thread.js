// Thread.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Thread extends Model {}

Thread.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'thread',
  }
);

module.exports = Thread;