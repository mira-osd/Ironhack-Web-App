const express = require('express');
const router  = express.Router();

const User = require('../models/user')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* sign up page*/
router.get('/signup', (req, res, next) => {
  res.render('authentification/signup');
});

router.post('/signup', (req, res, next) =>{
  let username = req.body.username
  let email    = req.body.email;
  let password = req.body.password;
  
  const user = new User({
    username,
    email,
    password
  })

  user.save()
  .then(user => {
    res.redirect('./users/create-profile') //revoir lien 
  })
  .catch(err => {
    res.render('/authentification/signup'); //revoir lien 
  })
}); 

/* LOGIN page*/
router.get('/login', (req, res, next) => {
  res.render('authentification/login');
});

router.post('/login', (req, res, next) =>{
  let username = req.body.username
  let password = req.body.password;
  
  const user = new User({
    username,
    password
  })

  user.save()
  .then(user => {
    res.redirect('./timeline')  
  })
  .catch(err => {
    res.render('login'); 
  })
}); 

module.exports = router;
