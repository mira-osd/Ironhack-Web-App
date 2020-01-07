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
    console.log('USER :', req.user);
    res.render('posts/post-add');
});

//je n'arrive pas à créer le modele post (schema) sur mongoDB + problème avec la validation du formulaire

// router.post('/posts/add', (req, res,next) => {
//     let picture = req.body.picture
//     let legende = req.body.legende
//     let date = req.body.date

//     const post = new Post({
//       picture,
//       legende,
//       date
//     })

//     post.save()
//     .then(post => {
//       res.redirect('./posts/timeline') //revoir lien 
//     })
//     .catch(err => {
//       res.render('post-add'); //revoir lien 
//     })
// })

router.post('/posts/add', (req, res, next) => {
    console.log('USER ', req.user);
    const creatorId = req.user._id;
    const { picture, legende } = req.body;
    const newPost = new Post({ creatorId, picture, legende })
    newPost.save()
      .then((post) => {
        res.redirect('/timeline'); // revoir lien
      })
      .catch((err) => {
        next(err); // display error
      })
    ;
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