const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
blogRouter.use(jsonParser);
blogRouter.get("/", async (request, response, next) => {
  console.log("getting all blog posts");
  await Blog.find({})
    .lean()
    .exec()
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});
blogRouter.get("/:id", async (request, response, next) => {
  console.log("getting just one blog posts");
  await Blog.findById(request.params.id)
    .lean()
    .exec()
    .then((blog) => {
      response.json(blog);
    })
    .catch((error) => next(error));
});

blogRouter.post("/", async (request, response, next) => {
  console.log("posting a blog post by", request.body.author);
  const body = request.body;
  console.log(body);

  const blog = Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  await blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).send({ status: "deleted" });
    })
    .catch((error) => next(error));
});

blogRouter.put("/:id", (request, response, next) => {
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
