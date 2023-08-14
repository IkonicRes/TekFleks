module.exports = {
    isTemplate: function (templateName, currentTemplateHTML, options) {
      console.log('Checking template:', templateName);
  
      if (currentTemplateHTML.includes(templateName)) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    consoleLog: function (loggedData) {
      console.log(loggedData);
    },
    ownsPostOrComment: (currentUserId, ownerId) => {
      return currentUserId === ownerId;
    },
    getCurrentUserIdHelper: (user) => {
      return user ? user.id : null;
    }
  };
  