const router = require('express').Router();
const { Blog } = require('../models');
const { checkForPk } = require("../utils/middleware")

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.post('/', async (req, res, next) => {
  try {
    const newBlog = req.body;
    console.log(newBlog);
    const created = await Blog.create(newBlog);
    return res.json(created);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id;
    await checkForPk(blogId, Blog);
    await Blog.destroy({
      where: {
        id: blogId
      }
    });
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const likes = req.body.likes; 
    await checkForPk(blogId, Blog); 
    const updated = await Blog.update({ likes }, {
      where: {
        id: blogId
      }
    });
    console.log(updated);
    return res.status(200).send();
  } catch (error) {
    next(error)
  }
})

module.exports = router;
