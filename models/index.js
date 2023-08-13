// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Forum.hasMany(Thread, { foreignKey: 'forum_id' });
Thread.belongsTo(Forum, { foreignKey: 'forum_id' });

Thread.hasMany(Post, { foreignKey: 'thread_id' });
Post.belongsTo(Thread, { foreignKey: 'thread_id' });

Thread.hasMany(Comment, { foreignKey: 'thread_id' });
Comment.belongsTo(Thread, { foreignKey: 'thread_id' });

// Users have many Posts
User.hasMany(Post, { foreignKey: 'id' });
// Each Post belongs to a User
Post.belongsTo(User, { foreignKey: 'id' });

// Users have many Comments
User.hasMany(Comment, { foreignKey: 'id' });
// Each Comment belongs to a User
Comment.belongsTo(User, { foreignKey: 'id' });

// Each Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'id' });
// Each Comment belongs to a Post
Comment.belongsTo(User, { foreignKey: 'id' });

module.exports = {
  User,
  Post,
  Comment,
};
