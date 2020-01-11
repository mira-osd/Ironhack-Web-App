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
Post.create({
    legende: req.body.legende, 
    creatorId: req.body.id,
    post_pic : req.file.url,
    pictureName: req.file.originalname

})
.then((post) => {
    res.redirect('/timeline'); 
 })
.catch((err) => {
    next(err); 
});
});



// EDIT POST page

// router.get('/posts/edit', (req, res, next) => {
//     res.render('posts/post-edit');
// });

// router.post('/posts/edit', (req, res, next) => {
//     const { post_pic, legende} = req.body;
    
//     Post.update({_id: req.query.book_id}, { $set: {post-pic, legende}})
//       .then((post) => {
//         res.redirect('/timeline');
//       })
//       .catch((error) => {
//         next(error);
//       })
//     ;
//   });

module.exports = router;