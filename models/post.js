const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user');

const postSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  post_pic: String,
  pictureName: String,
  legende: String,
  url : String,
  url2: String,
  url3 : String,
  url_name: String,
  url_name2: String,
  url_name3: String,
},{
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;