// import models
const Topic = require('./Topic');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Topic.hasMany(Post, { foreignKey: 'topic_id' });



// Users have many Posts
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
// Each Post belongs to a User
Post.belongsTo(User, { foreignKey: 'user_id' });

// Users have many Comments
// Each Comment belongs to a User

Post.belongsTo(Topic, { foreignKey: 'topic_id' });
// Each Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'post_id' });
// Each Comment belongs to a Post
Comment.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = {
  Topic,
  User,
  Post,
  Comment,
};
