const express = require('express');
const router  = express.Router();

const User = require('../models/user');
const Post = require("../models/post")

const uploadCloud = require('../config/cloudinary.js');
const mongoose           = require('mongoose');


/* CREATE PROFILE page*/
router.get('/create-profile', (req, res, next) => {
    
    User.findById(req.user.id).then(user => {
      res.render('users/create-profile',{
        user:req.user
      });
    })
    .catch(next)
  });

router.post('/create-profile', uploadCloud.array([{ name: 'icon' }, { name: 'favorite_pic' }]),(req, res,next) => {
  const username = req.body.username;
  const icon = req.files.icon ? req.files.icon[0].url : req.user.icon;
  const favorite_pic = req.files.favorite_pic ? req.files.favorite_pic[0].url : req.user.favorite_pic;
  const bio = req.body.bio;
  const city= req.body.city
    User.update({_id:req.user.id}, {$set: {username, icon, favorite_pic, bio, city}})
    .then(user => {
      res.redirect('../timeline');
    })
    .catch((err) => {
      next(err);
    })

})

// UPDATE PROFILE page

router.get('/update-profile', (req, res, next) => {
    res.render('users/update-profile',{
      user:req.user
    });
});

router.post('/update-profile', uploadCloud.fields([{ name: 'icon' }, { name: 'favorite_pic' }]),(req, res,next) => {
const username = req.body.username;
const icon = req.files.icon ? req.files.icon[0].url : req.user.icon;
const favorite_pic = req.files.favorite_pic ? req.files.favorite_pic[0].url : req.user.favorite_pic;
const bio = req.body.bio;
const city= req.body.city
  User.update({_id:req.user.id}, {$set: { username, icon, favorite_pic, bio, city}})
  .then(user => {
    res.redirect('../timeline');
  })
  .catch((err) => {
    next(err);
  })
})


/*VIEW PROFILE des autres users page*/

router.get('/profile', (req, res, next) => {
  User.findById(req.user.id)
  .then(profile => res.render('users/profile', {profile}))
  .catch(err => next(err));
  });

/*VIEW MY PROFILE page*/

router.get('/my-profile', (req, res, next) => {
  const user = req.user
  // User.findById(req.user.id)
  // .then(profile => res.render('users/my-profile', {profile}))
  console.log("j'entre dans mon profil",user)


  Post.find({
    'creatorId' : { $in : [
      mongoose.Types.ObjectId(req.user.id)
    ]
    }
}).then(posts => {
  console.log('posts', posts)
  res.render('users/my-profile', {
    user: req.user,
    posts: posts
  })
})
.catch(next)
})

// DELETE POST 

router.get('/:id/delete', (req, res, next) => {
  Post.findByIdAndRemove({_id: req.params.id})
    .then(post => res.redirect('/users/my-profile'))
    .catch(err => next(err))
  ;
});

  module.exports = router;