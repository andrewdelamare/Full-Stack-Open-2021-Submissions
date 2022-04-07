const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/api/blogs', middleware.userExtractor, async (request, response) => {
  const { user } = request;

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

blogsRouter.delete('/api/blogs/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const blog = await Blog.findById(id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } else {
    response.status(403).json({ error: 'in order to delete this blog you must be signed in as the user who created it' });
  }
});

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const { id } = request.params;
  const update = request.body;
  console.log('THIS IS THE UPDATE TO BE SENT: ', update);
  await Blog.findByIdAndUpdate(id, update, { runValidators: true });
  const updated = await Blog.findById(id);
  console.log('THIS IS THE RESPONSE', updated)
  response.json(updated);
  response.status(200).end();
});

module.exports = blogsRouter;
