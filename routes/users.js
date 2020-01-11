const express = require('express');
const router  = express.Router();

const User = require('../models/user');

const uploadCloud = require('../config/cloudinary.js');

/* CREATE PROFILE page*/
router.get('/create-profile', (req, res, next) => {
    
    User.findById(req.user.id).then(user => {
      res.render('users/create-profile',{
        user:req.user
      });
    })
    .catch(next)
  });

router.post('/create-profile', uploadCloud.array('photo'),(req, res,next) => {
    
    User.update({_id:req.user.id}, {$set: {
      username: req.body.username,
      icon: req.files[0].url,
      favorite_pic: req.files[1].url,
      bio: req.body.bio,
      city: req.body.city
    }})
    .then(user => {
      res.redirect('../timeline');
    })
    .catch((err) => {
      next(err);
    })

})

// UPDATE PROFILE page

router.get('/update-profile', (req, res, next) => {
  res.render('users/update-profile');
});



/*VIEW PROFILE page*/

router.get('/profile', (req, res, next) => {
  User.find()
  .then(profile => res.render('users/profile', {profile}))
  .catch(err => next(err));
    // res.render('users/profile');
  });

/*VIEW MY PROFILE page*/

router.get('/my-profile', (req, res, next) => {
    res.render('users/my-profile');
  });


  module.exports = router;