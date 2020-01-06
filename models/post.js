const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
  picture: String,
  legende: String,
  date: Date, 
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;