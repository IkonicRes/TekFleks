const { User } = require('../models'); // Just 'models' is sufficient

const userData = [
  {
    username: 'user1',
    password: 'password1',
    profile_pic_url: 'https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y',
  },
  {
    username: 'user2',
    password: 'password2',
    profile_pic_url: 'https://www.gravatar.com/avatar/22222222222222222222222222222222?d=mp&f=y',
  },
];


const seedUsers = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUsers;
