const express = require('express');
const router  = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

const uploadCloud = require('../config/cloudinary.js');

// TIMELINE

router.get('/timeline', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }

  Post.find()
  .populate('creatorId')
  .then(post => {
    console.log('post', post)
    res.render('posts/timeline', {
      user:req.user,
      post:post
    });
  })
  .catch(next)
});
 

// ADD POST page 

router.get('/posts/add', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
    res.render('posts/post-add');
});

router.post('/posts/add',uploadCloud.single('post_pic'), (req, res, next) => {
  console.log('userid=', req.user.id);
  Post.create({
      legende: req.body.legende, 
      creatorId: req.user.id,
      post_pic : req.file.url,
      pictureName: req.file.originalname
  })
  .then((post) => {
      res.redirect('/timeline'); 
  })
  .catch(next);
});

// EDIT POST page

router.get('/posts/:id/edit', (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .then(post => res.render('posts/post-edit', {post}))
  .catch(err => next(err))
;
});

router.post('/posts/:id/edit',uploadCloud.single('post_pic'),(req, res, next) => {
  const post_pic = req.file.url;
  const legende = req.body.legende;
  const pictureName = req.file.originalname; 

    Post.update({_id: req.params.id}, { $set: {post_pic, legende, pictureName}})
      .then((post) => {
        res.redirect('/timeline');
      })
      .catch((error) => {
        next(error);
      })
    ;
  });

module.exports = router;