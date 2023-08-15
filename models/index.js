// Import the required models
const Topic = require('./Topic');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');

// Define the associations between the models

// Each Topic has many Posts
Topic.hasMany(Post, { foreignKey: 'topic_id' });
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
User.hasMany(Like, { foreignKey: 'user_id' });

Post.belongsTo(User, { foreignKey: 'user_id' });
Post.belongsTo(Topic, { foreignKey: 'topic_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });
Post.hasMany(Like, { foreignKey: 'post_id', as: 'postLikes' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.hasMany(Like, { foreignKey: 'comment_id' });

Like.belongsTo(User, { foreignKey: 'user_id' });



// Export the models
module.exports = {
  Topic,
  User,
  Post,
  Comment,
  Like
};
