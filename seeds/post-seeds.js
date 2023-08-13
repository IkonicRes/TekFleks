const { Post } = require('../models');

const postData = [
  {
    poster_id: 1,
    likes: 5,
    text_content: "This is the first post's text content.",
    media_url: 'https://example.com/image1.jpg',
  },
  {
    poster_id: 2,
    likes: 10,
    text_content: "This is the second post's text content.",
    media_url: 'https://example.com/image2.jpg',
  },
];


const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;