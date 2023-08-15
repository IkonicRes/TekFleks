const { User, Post, Comment, Topic } = require('../models');
// Exporting an object as a module
module.exports = {
  // Defining a function named "isTemplate" which takes three parameters: templateName, currentTemplateHTML, and options
  isTemplate: function (templateName, currentTemplateHTML, options) {
    // Logging a message to the console with the templateName
    // console.log('Checking template:', templateName);

    // Checking if the currentTemplateHTML includes the templateName
    if (currentTemplateHTML.includes(templateName)) {
      // If it does, executing the function passed as options.fn and passing it the current context (this)
      return options.fn(this);
    }
    // If it doesn't, executing the function passed as options.inverse and passing it the current context (this)
    return options.inverse(this);
  },
  unlessTemplate: function (templateName, currentTemplateHTML, options) {
    // Logging a message to the console with the templateName
    // console.log('Checking template:', templateName);

    // Checking if the currentTemplateHTML includes the templateName
    if (!currentTemplateHTML.includes(templateName)) {
      // If it does, executing the function passed as options.fn and passing it the current context (this)
      return options.fn(this);
    }
    // If it doesn't, executing the function passed as options.inverse and passing it the current context (this)
    return options.inverse(this);
  },
  getUserFromId: function (id, userMap, comments) {
    if (!comments || !Array.isArray(comments)) {
        return 'Invalid comments data: Comments should be an array';
    }

    const comment = comments.find(comment => comment.dataValues.comment_poster_id === id);
    if (!comment) {
        return 'Commenter not found';
    }

    if (!userMap) {
        return 'Invalid comments data: User map not provided';
    }

    const user = userMap[id];
    if (!user) {
        return 'Commenter user not found in user map';
    }

    return user.username;
},

  incrementLike: async function (postId) {
    try {
        const post = await Post.findByPk(postId);
        if (post) {
            await post.increment('likes', { by: 1 });
            console.log('Likes incremented successfully');
        } else {
            console.log('Post not found');
        }
    } catch (error) {
        console.error('Error incrementing likes:', error);
    }
},




  // Defining a function named "consoleLog" which takes one parameter: loggedData
  consoleLog: function (loggedData) {
    // Logging the loggedData to the console
    console.log(loggedData);
  },
  number: function (value) {
    return Number(value);
  },
  // Defining an arrow function named "ownsPostOrComment" which takes two parameters: currentUserId and ownerId
  ownsPostOrComment: (currentUserId, ownerId) => {
    console.log("🚀 ~ file: helpers.js:46 ~ currentUserId, ownerId:", currentUserId, ownerId)
    // Checking if the currentUserId is equal to the ownerId
    return currentUserId === ownerId;
  },
  // Defining an arrow function named "getCurrentUserIdHelper" which takes one parameter: user
  getCurrentUserIdHelper: (user) => {
    // Returning the user's id if it exists, otherwise returning null
    return user ? user.id : null;
  },
  formatDate: (date) => {
    console.log('Debug - date:', date);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  }
};
