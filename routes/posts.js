const express = require('express');
const router  = express.Router();

const User = require('../models/user')
const Post = require('../models/post')

// HOMEPAGE

router.get('/timeline', (req, res, next) => {
    res.render('posts/timeline');
  });

// ADD POST page 

router.get('/posts/add', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
    res.render('posts/post-add');
});

router.post('/posts/add', (req, res, next) => {
Post.create({
    legende: req.body.legende, 
    creatorId: req.body.id,
    picture : req.body.picture
})
.then((post) => {
    res.redirect('/timeline'); 
 })
.catch((err) => {
    next(err); 
});
});

// EDIT POST page

router.get('/posts/edit', (req, res, next) => {
    res.render('posts/post-edit');
});

router.post('/posts/edit', (req, res, next) => {
    const { picture, legende} = req.body;
    
    Post.update({_id: req.query.book_id}, { $set: {picture, legende}})
      .then((post) => {
        res.redirect('/timeline');
      })
      .catch((error) => {
        next(error);
      })
    ;
  });

module.exports = router;