const { Blog } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const newBlog = req.body;
    console.log(newBlog);
    const created = await Blog.create(newBlog);
    return res.json(created);
  } catch (error) {
    res.status(404).end()
  }
})

router.delete('/', async (req, res) => {
  try {
    const blogId = req.params.id;
    const found = Blog.findByPk(blogId);
    if (found){ 
      await Blog.destroy({
        where: {
          id: blogId
        }
      });
    return res.status(200)}
  } catch (error) {
    res.status(404).end()
  }
})

module.exports = router;