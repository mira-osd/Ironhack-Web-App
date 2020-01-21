const express = require('express');
const router  = express.Router();

const passport = require('passport');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require('../models/user')



/* 1.SIGN UP */

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', (req, res, next) =>{
  let email    = req.body.email;
  let password = req.body.password;

  // Check email and password are not empty
  if (email === "" || password === "") {
    res.render("authentication/signup", { errorMessage: "Il faut une adresse e-mail et un mot de passe pour pouvoir vous connecter" });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.render("authentication/signup", { errorMessage: "Cette adresse email existe déjà" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

  
  const newUser = new User({
    email,
    password: hashPass
  });

  newUser.save()
  .then(user => {
    req.login(user, err => {
      if (err) return next(err);

      res.redirect('./users/create-profile'); 
    });
  })
  .catch(err => {
    res.render('/authentication/signup'); 
  })
})
.catch(err => next(err))
; 
});


/* 2.LOGIN PAGE */

router.get('/login', (req, res) => {
  res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/timeline',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/timeline',
  failureRedirect: '/login' }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router; 