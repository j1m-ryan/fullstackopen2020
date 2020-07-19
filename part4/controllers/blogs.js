const blogRouter = require('express').Router();
const Blog = require('../models/blog');
require("express-async-errors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
blogRouter.use(jsonParser);
blogRouter.get('/', async (request, response,) => {
  console.log('getting all blog posts');
  const blogs = await Blog.find({})

  response.status(200).json(blogs);

});
blogRouter.get('/:id', async (request, response,) => {
  const blog = await Blog.findById(request.params.id)

  response.status(200).json(blog);
});

blogRouter.post('/', async (request, response) => {
  console.log('posting a blog post by', request.body.author);
  const body = request.body;
  console.log(body);

  const blog = Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const result = await blog.save()
  response.status(201).json(result)

});

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).send({ status: 'deleted' });
    })
    .catch((error) => next(error));
});

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
