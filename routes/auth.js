const express = require('express');
const router  = express.Router();

const passport = require('passport');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require('../models/user')


/* 1.SIGN UP */

router.get('/signup', (req, res) => {
<<<<<<< HEAD
  res.render('authentification/signup', { message: req.flash('error')});
=======
  res.render('authentication/signup', { message: req.flash('error')});
>>>>>>> c5a3e32aae33362072d9a90f75bc843536d512ba
});

router.post('/signup', (req, res, next) =>{
  let email    = req.body.email;
  let password = req.body.password;

  // Check email and password are not empty
  if (email === "" || password === "") {
<<<<<<< HEAD
    res.render("authentification/signup", { errorMessage: "Il faut une adresse e-mail et un mot de passe pour pouvoir vous connecter" });
=======
    res.render("authentication/signup", { errorMessage: "Il faut une adresse e-mail et un mot de passe pour pouvoir vous connecter" });
>>>>>>> c5a3e32aae33362072d9a90f75bc843536d512ba
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
<<<<<<< HEAD
        res.render("authentification/signup", { errorMessage: "Cette adresse email existe déjà" });
=======
        res.render("authentication/signup", { errorMessage: "Cette adresse email existe déjà" });
>>>>>>> c5a3e32aae33362072d9a90f75bc843536d512ba
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

<<<<<<< HEAD
      res.redirect('./users/create-profile');
=======
      res.redirect('./users/create-profile'); 
>>>>>>> c5a3e32aae33362072d9a90f75bc843536d512ba
    });
  })
  .catch(err => {
    res.render('/authentification/signup'); 
  })
})
.catch(err => next(err))
; 
});


/* 2.LOGIN PAGE */

router.get('/login', (req, res) => {
<<<<<<< HEAD
  res.render('authentification/login', { message: req.flash('error')});
=======
  res.render('authentication/login', { message: req.flash('error')});
>>>>>>> c5a3e32aae33362072d9a90f75bc843536d512ba
});

router.post('/login', passport.authenticate('local', {
  successRedirect : './timeline',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});



module.exports = router; 