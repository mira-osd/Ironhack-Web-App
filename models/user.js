const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String, 
  icon: String,
  favorite_pic: String, 
  bio: String,
  city: String,
  facebookId: String,
  instagramId: String,
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;