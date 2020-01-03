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

// EDIT POST page

router.get('/posts/edit', (req, res, next) => {
    res.render('posts/post-edit');
});



module.exports = router;