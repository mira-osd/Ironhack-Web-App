require('dotenv').config();

const bodyParser         = require('body-parser');
const cookieParser       = require('cookie-parser');
const express            = require('express');
const favicon            = require('serve-favicon');
const hbs                = require('hbs');
const mongoose           = require('mongoose');
const logger             = require('morgan');
const path               = require('path');
const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const bcrypt             = require('bcrypt');
const session            = require('express-session');
const flash              = require('connect-flash');
const MongoStore         = require('connect-mongo')(session);
const User               = require('./models/user.js')
const FacebookStrategy   = require('passport-facebook').Strategy;
const dotenv             = require("dotenv").config();


// connection à Mongoose 
mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use(session({
  secret: "project-2",
  store: new MongoStore( { mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
  ;
});

passport.use(new LocalStrategy(
  {passReqToCallback: true,
    usernameField: 'email',
  },
  (...args) => {
    const [req,,, done] = args;

    const {email, password} = req.body;

    User.findOne({email})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
    
        done(null, user);
      })
      .catch(err => done(err))
    
  }));

// AUTH FACEBOOK

passport.use(new FacebookStrategy({
  clientID: "1260949300756643",
  clientSecret: "248450ecc28fcf21ee1b7886a2c3af45",
  callbackURL: "http://localhost:3000/login/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({facebookId: profile.id})
  .then(user => {
    // If found, login with that user:
    if (user) {
      done(null, user);
      return;
    }});

  User.create({ facebookID: profile.id })
            .then(newUser => {
              done(null, newUser);
            })
            //.catch(err => done(err))
          ;
        })
       //.catch(err => done(err))
);


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Open Dressing';


const index = require('./routes/index');
app.use('/', index);

const users = require('./routes/users');
app.use('/users', users)

const posts = require('./routes/posts');
app.use('/', posts)

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

module.exports = app;
