const express = require('express');
const router  = express.Router();

const User = require('../models/user');
const Post = require('../models/post');

const moment = require('moment');
const uploadCloud = require('../config/cloudinary.js');

// TIMELINE

router.get('/timeline', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  
  Post.find().sort({createdAt: -1})
  .populate('creatorId')
  .then(initialPosts => {
    const finalPosts = initialPosts.map(onePost => {
      onePost.isAuthor = onePost.creatorId._id.toString() === req.user._id.toString();
      onePost.dateFromNow = moment(onePost.createdAt).fromNow();
      return onePost;
    });
    res.render('posts/timeline', {
      user:req.user,
      posts: finalPosts,
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
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  console.log('userid=', req.user.id);
  Post.create({
      legende: req.body.legende, 
      creatorId: req.user.id,
      post_pic : req.file.url,
      pictureName: req.file.originalname,
      url_name: req.body.url_name,
      url_name2: req.body.url_name2,
      url_name3: req.body.url_name3,
      url: req.body.url,
      url2: req.body.url2,
      url3: req.body.url3,
      
  })
  .then((post) => {
      res.redirect('/timeline'); 
  })
  .catch(next);
});

// DELETE POST page 

router.get('/posts/:id/delete', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  Post.findByIdAndRemove({_id: req.params.id})
    .then(post => res.redirect('/timeline'))
    .catch(err => next(err))
  ;
});


// EDIT POST page

router.get('/posts/:id/edit', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  Post.findOne({_id: req.params.id})
  .then(post => res.render('posts/post-edit', {post}))
  .catch(err => next(err))
;
});

router.post('/posts/:id/edit',uploadCloud.single('post_pic'),(req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  const creatorId = req.user.id;
  const post_pic = req.file.url;
  const legende = req.body.legende;
  const pictureName = req.file.originalname; 
  const url_name = req.body.url_name;
  const url_name2 = req.body.url_name2;
  const url_name3 = req.body.url_name3;
  const url = req.body.url;
  const url2 = req.body.url2;
  const url3 = req.body.url3;

    Post.update({_id: req.params.id}, { $set: { creatorId, post_pic, legende, pictureName, url, url_name}})
      .then((post) => {
        res.redirect('/timeline');
      })
      .catch((error) => {
        next(error);
      })
    ;
  });

module.exports = router;