const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken")
require('express-async-errors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
blogRouter.use(jsonParser);
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request, response) => {
  console.log('getting all blog posts');
  const blogs = await Blog.find({}).populate('user');

  response.status(200).json(blogs);
});
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  response.status(200).json(blog);
});

blogRouter.post('/', async (request, response) => {
  console.log('posting a blog post by', request.body.author);
  const body = request.body;
  console.log(body);
  if (body.title == undefined || body.url == undefined) {
    return response.sendStatus(400);
  }
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  const blog = Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  });

  user.blogList = user.blogList.concat(blog._id);
  await user.save();

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).send({ status: 'deleted' });
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(updatedBlog);
});


module.exports = blogRouter;
