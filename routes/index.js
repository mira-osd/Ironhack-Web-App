const express = require('express');
const router  = express.Router();

const User = require('../models/user');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    user: req.user,
  });
});

module.exports = router;
