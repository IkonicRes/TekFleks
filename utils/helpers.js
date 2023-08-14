// Exporting an object as a module
module.exports = {
  // Defining a function named "isTemplate" which takes three parameters: templateName, currentTemplateHTML, and options
  isTemplate: function (templateName, currentTemplateHTML, options) {
    // Logging a message to the console with the templateName
    console.log('Checking template:', templateName);

    // Checking if the currentTemplateHTML includes the templateName
    if (currentTemplateHTML.includes(templateName)) {
      // If it does, executing the function passed as options.fn and passing it the current context (this)
      return options.fn(this);
    }
    // If it doesn't, executing the function passed as options.inverse and passing it the current context (this)
    return options.inverse(this);
  },
  // Defining a function named "consoleLog" which takes one parameter: loggedData
  consoleLog: function (loggedData) {
    // Logging the loggedData to the console
    console.log(loggedData);
  },
  // Defining an arrow function named "ownsPostOrComment" which takes two parameters: currentUserId and ownerId
  ownsPostOrComment: (currentUserId, ownerId) => {
    // Checking if the currentUserId is equal to the ownerId
    return currentUserId === ownerId;
  },
  // Defining an arrow function named "getCurrentUserIdHelper" which takes one parameter: user
  getCurrentUserIdHelper: (user) => {
    // Returning the user's id if it exists, otherwise returning null
    return user ? user.id : null;
  }
};
