const router = require('express').Router();
const { Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      let postData;
      if (req.query.sortBy === 'likes') {
        postData = await Post.findAll({
          include: Comment,
          order: [['likes', 'DESC']],
        });
      } else {
        postData = await Post.findAll({
          include: Comment,
        });
      }
      let posts = postData.map((post) => post.get({ plain: true }));
      res.render('feed', {posts: posts});
    } catch (error) {
        console.log(error)
      res.status(500).json(error);
    }
  });

  module.exports = router;