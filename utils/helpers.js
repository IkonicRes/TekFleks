module.exports = {
    isTemplate: function (templateName, options) {
      if (templateName === options.data.root.body) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  };