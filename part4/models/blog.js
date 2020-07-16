const {Schema, model} = require('mongoose');

const blogSchema = Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  url: {type: String, required: true},
  likes: {type: Number, required: true},
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
