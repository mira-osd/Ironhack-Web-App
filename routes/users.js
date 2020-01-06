const express = require('express');
const router  = express.Router();

const User = require('../models/user')

/* CREATE PROFILE page*/
router.get('/create-profile', (req, res, next) => {
    res.render('users/create-profile');
  });

router.post('/create-profile', (req, res,next) => {
    let username = req.body.username
    let icon = req.body.icon
    let favorite_pic = req.body.favorite_pic;
    let bio = req.body.icon;
    let city = req.body.city

    const profile = new User({
      username,
      icon, 
      favorite_pic, 
      bio,
      city
    })

    profile.save()
    .then(profile => {
      res.redirect('./posts/timeline') //revoir lien 
    })
    .catch(err => {
      res.render('create-profile'); //revoir lien 
    })

    // voir comment faire pour que le create profile s'ajoute aux données de l'user sans en créer un nouveau ! 

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