const { Post } = require('../models');

const postData = [
  {
    poster_id: 1,
    likes: 0,
    title: "First Post",
    text_content: "This is the first post's detailed text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lectus aliquet, ullamcorper nisl ac, varius magna. Nulla facilisi. Sed id velit in eros tincidunt finibus. Morbi auctor magna nec massa fringilla, quis congue nunc bibendum. Donec hendrerit, tortor vel laoreet euismod, elit elit vehicula urna, sit amet ultrices lorem quam eu arcu.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image1.jpg',
    topic_id: 2
  },
  {
    poster_id: 2,
    likes: 0,
    title: "Second Post",
    text_content: "This is the second post's detailed text content. Ut id augue et augue facilisis consequat in nec justo. Sed sed feugiat libero, at cursus arcu. Nam eget orci ut arcu dignissim ultricies. Vestibulum eget faucibus nulla. Sed blandit nulla a metus rhoncus varius. Nullam tristique sapien vitae nunc egestas, at venenatis est feugiat.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image2.jpg',
    topic_id: 2
  },
  {
    poster_id: 1,
    likes: 0,
    title: "Third Post",
    text_content: "Check out this amazing tech article! Curabitur nec arcu non odio vehicula dictum. Integer efficitur, elit eget pellentesque egestas, sapien eros euismod turpis, id bibendum nisi sem vel justo. Nulla facilisi. Sed nec lorem non sem efficitur sollicitudin vel eget lectus.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image3.jpg',
    topic_id: 3
  },
  {
    poster_id: 2,
    likes: 0,
    title: "Fourth Post",
    text_content: "Just published a new blog post on AI trends. Quisque scelerisque bibendum arcu, eget commodo erat varius id. Nullam eget nibh vel justo vulputate congue. Fusce sagittis quam nec quam iaculis posuere. Nunc a hendrerit nunc. Sed varius justo eu sapien pellentesque rhoncus. Curabitur dapibus nunc in ex bibendum, eget sagittis lectus gravida. Curabitur eget dolor vel libero tincidunt dignissim vel vel est.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image4.jpg',
    topic_id: 4
  },
  {
    poster_id: 2,
    likes: 0,
    title: "Fifth Post",
    text_content: "Sharing my experience at the latest tech conference. Aenean faucibus erat in nisi auctor, nec dictum elit lacinia. Nulla facilisi. Fusce pharetra justo quis sem dignissim, sit amet commodo ligula volutpat. Maecenas ullamcorper enim id mi malesuada, ac ultrices ante venenatis. Nunc a varius turpis, at aliquet velit. Etiam scelerisque purus et elit volutpat, in euismod risus rhoncus.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image5.jpg',
    topic_id: 1
  },
  {
    poster_id: 3,
    likes: 0,
    title: "I think cheeseburgers are underrated",
    text_content: "Oh, friggin' cheeseburgers, let me tell ya, they're the unsung heroes of the culinary world, bud. People get all fancy with their kale salads and quinoa bowls, but what about the good ol' cheeseburger, huh? It's like the greasy crown jewel of comfort food, livin' life in the shadow of all them fancy-pants dishes. I mean, think about it, you got that juicy, sizzlin' beef patty, just oozin' with flavor like it's givin' you a tasty hug from the inside. And then, you slap a couple of slices of good ol' cheddar or American cheese on there – none of them fancy artisan cheeses, just the real deal. It's like a warm, melty blanket of cheesy goodness, holdin' everything together like a burger masterpiece. But that's not all, my friend. You got the crispy lettuce and the tangy pickles, addin' that crunch and zing that cuts through the meaty richness like a dart through a beer can. And don't even get me started on the mayo and ketchup mixin' together, creatin' a saucy symphony that dances on your taste buds like Bubbles on his kitties. And let's not forget about the buns, the unsung heroes holdin' the whole operation together. Soft and squishy on the inside, but toasted to perfection on the outside, they're like the rock 'n' roll backbone of the cheeseburger band. So, there you have it, buddy. Cheeseburgers, they're like the underdogs of the food world, always deliverin' that perfect combo of comfort, flavor, and downright satisfaction. Next time you're lookin' for a meal, don't forget the cheeseburger – it's like a slice of heaven wrapped in greasy goodness, just like life in Sunnyvale Trailer Park.",
    created_at: '08/14/2023, 7:07 PM',
    media_url: 'https://example.com/image5.jpg',
    topic_id: 2
  },
  // Add more posts here
];


const seedPosts = async () => await Post.bulkCreate(postData);

module.exports = seedPosts;