// import models
const Topic = require('./Topic');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Topic.hasMany(Post, { foreignKey: 'id' });



// Users have many Posts
User.hasMany(Post, { foreignKey: 'id' });
User.hasMany(Comment, { foreignKey: 'id' });
// Each Post belongs to a User
Post.belongsTo(User, { foreignKey: 'id' });

// Users have many Comments
// Each Comment belongs to a User

Post.belongsTo(Topic, { foreignKey: 'id' });
// Each Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'id' });
// Each Comment belongs to a Post
Comment.belongsTo(User, { foreignKey: 'id' });
Comment.belongsTo(User, { foreignKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'id' });

module.exports = {
  Topic,
  User,
  Post,
  Comment,
};
