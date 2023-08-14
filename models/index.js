// Import the required models
const Topic = require('./Topic');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define the associations between the models

// Each Topic has many Posts
Topic.hasMany(Post, { foreignKey: 'topic_id' });

// Each User has many Posts and Comments
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });

// Each Post belongs to a User and a Topic
Post.belongsTo(User, { foreignKey: 'user_id' });
Post.belongsTo(Topic, { foreignKey: 'topic_id' });

// Each Post can have many Comments
Post.hasMany(Comment, { foreignKey: 'post_id' });

// Each Comment belongs to a User and a Post
Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// Export the models
module.exports = {
  Topic,
  User,
  Post,
  Comment,
};
