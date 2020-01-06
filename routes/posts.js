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
    res.render('posts/post-add');
});

//je n'arrive pas à créer le modele post (schema) sur mongoDB 

router.post('/posts/add', (req, res,next) => {
    let picture = req.body.picture
    let legende = req.body.legende
    let date = req.body.date

    const post = new Post({
      picture,
      legende,
      date
    })

    post.save()
    .then(post => {
      res.redirect('./posts/timeline') //revoir lien 
    })
    .catch(err => {
      res.render('post-add'); //revoir lien 
    })
})

// EDIT POST page

router.get('/posts/edit', (req, res, next) => {
    res.render('posts/post-edit');
});



module.exports = router;