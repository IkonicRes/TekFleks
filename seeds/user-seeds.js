const bcrypt = require('bcrypt');
const { User } = require('../models');

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
  const hashedUsers = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  await User.bulkCreate(hashedUsers);
};

module.exports = seedUsers;
