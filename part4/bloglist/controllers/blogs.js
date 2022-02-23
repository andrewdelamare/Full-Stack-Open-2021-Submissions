const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/api/blogs', async (request, response) => {
  // const user = await User.findById(request.body.userId)
  const users = await User.find({});
  const user4 = users[3];
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user4,
  });
  const result = await blog.save();
  user4.blogs = user4.blogs.concat(result.id);
  await user4.save();
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
