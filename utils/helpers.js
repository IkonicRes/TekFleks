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
  getUserFromId: async (id) => {
    
  },
  saveAndNavigate: function (postId, navigateUrl) {
    console.log('AAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
    saveEdit(postId)
        .then(() => {
            window.location.href = navigateUrl;
        })
        .catch(error => {
            console.error('Error saving edit:', error);
        });
},
  savePost: async function (postId, textAreaContent) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    return new Promise(async (resolve, reject) => {
      const postData = {
        text_content: textAreaContent,
        // Add other necessary attributes here
      };

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 200) {
        const updatedPost = await response.json();
        console.log('Post updated successfully:', updatedPost);
        return updatedPost;
      } else {
        console.error('Error updating post:', response.statusText);
        return null;
      }
    } 
    );},

  deletePost: async function (postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        console.log('Post deleted successfully.');
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
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

deletePost: async function (postId) {
  // Send a DELETE request to the specified route
  await fetch(`api/posts/${postId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.status === 204) {
      // Successful deletion
      console.log('Post deleted successfully.');
      // Perform any additional actions, such as updating the UI
    } else {
      // Error in deletion
      console.error('Error deleting post.');
    }
  })
  .catch(error => {
    console.error('Error deleting post:', error);
  });
},

  // Defining a function named "consoleLog" which takes one parameter: loggedData
  consoleLog: function (loggedData) {
    // Logging the loggedData to the console
    console.log(loggedData);
  },
  number: function (value) {
    console.log("🚀 ~ file: helpers.js:78 ~ value:", value)
    
    return Number(value);
  },
  // Defining an arrow function named "ownsPostOrComment" which takes two parameters: currentUserId and ownerId
  ownsPostOrComment: (currentUserId, ownerId) => {
    // console.log("🚀 ~ file: helpers.js:46 ~ currentUserId, ownerId:", currentUserId, ownerId)
    // Checking if the currentUserId is equal to the ownerId
    console.log("🚀 ~ file: helpers.js:48 ~ currentUserId, ownerId:", currentUserId, ownerId)
    return currentUserId == ownerId;
  },
  // Defining an arrow function named "getCurrentUserIdHelper" which takes one parameter: user
  getCurrentUserIdHelper: (user) => {
    // Returning the user's id if it exists, otherwise returning null
    return user ? user.id : null;
  },
  formatDate: (date) => {
    // console.log('Debug - date:', date);
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
