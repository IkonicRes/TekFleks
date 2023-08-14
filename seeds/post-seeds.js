const { Post } = require('../models');

const postData = [
  {
    poster_id: 1,
    likes: 5,
    title: "First Post",
    text_content: "This is the first post's detailed text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lectus aliquet, ullamcorper nisl ac, varius magna. Nulla facilisi. Sed id velit in eros tincidunt finibus. Morbi auctor magna nec massa fringilla, quis congue nunc bibendum. Donec hendrerit, tortor vel laoreet euismod, elit elit vehicula urna, sit amet ultrices lorem quam eu arcu.",
    media_url: 'https://example.com/image1.jpg',
    topic_id: 2
  },
  {
    poster_id: 2,
    likes: 10,
    title: "Second Post",
    text_content: "This is the second post's detailed text content. Ut id augue et augue facilisis consequat in nec justo. Sed sed feugiat libero, at cursus arcu. Nam eget orci ut arcu dignissim ultricies. Vestibulum eget faucibus nulla. Sed blandit nulla a metus rhoncus varius. Nullam tristique sapien vitae nunc egestas, at venenatis est feugiat.",
    media_url: 'https://example.com/image2.jpg',
    topic_id: 2
  },
  {
    poster_id: 1,
    likes: 3,
    title: "Third Post",
    text_content: "Check out this amazing tech article! Curabitur nec arcu non odio vehicula dictum. Integer efficitur, elit eget pellentesque egestas, sapien eros euismod turpis, id bibendum nisi sem vel justo. Nulla facilisi. Sed nec lorem non sem efficitur sollicitudin vel eget lectus.",
    media_url: 'https://example.com/image3.jpg',
    topic_id: 3
  },
  {
    poster_id: 3,
    likes: 8,
    title: "Fourth Post",
    text_content: "Just published a new blog post on AI trends. Quisque scelerisque bibendum arcu, eget commodo erat varius id. Nullam eget nibh vel justo vulputate congue. Fusce sagittis quam nec quam iaculis posuere. Nunc a hendrerit nunc. Sed varius justo eu sapien pellentesque rhoncus. Curabitur dapibus nunc in ex bibendum, eget sagittis lectus gravida. Curabitur eget dolor vel libero tincidunt dignissim vel vel est.",
    media_url: 'https://example.com/image4.jpg',
    topic_id: 4
  },
  {
    poster_id: 2,
    likes: 15,
    title: "Fifth Post",
    text_content: "Sharing my experience at the latest tech conference. Aenean faucibus erat in nisi auctor, nec dictum elit lacinia. Nulla facilisi. Fusce pharetra justo quis sem dignissim, sit amet commodo ligula volutpat. Maecenas ullamcorper enim id mi malesuada, ac ultrices ante venenatis. Nunc a varius turpis, at aliquet velit. Etiam scelerisque purus et elit volutpat, in euismod risus rhoncus.",
    media_url: 'https://example.com/image5.jpg',
    topic_id: 1
  },
  // Add more posts here
];


const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;