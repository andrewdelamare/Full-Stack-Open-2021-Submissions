const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const blog = request.body;

  await Blog.findByIdAndUpdate(blog.id, blog, { runValidators: true });
  response.json(blog);
  response.status(200).end();
});

module.exports = blogsRouter;
