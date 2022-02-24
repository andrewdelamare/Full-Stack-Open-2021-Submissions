const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/api/blogs', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result.id);
  await user.save();

  return (
    response.status(201).json(result)
  );
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
