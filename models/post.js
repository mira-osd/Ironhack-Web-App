const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user');

const postSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  post_pic: String,
  pictureName: String,
  legende: String,
},{
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;