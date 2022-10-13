const router = require('express').Router();
const { Blog, User } = require('../models');
const { checkForPk, checkBlogCreator, tokenExtractor } = require("../utils/middleware")

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    await checkForPk(req.decodedToken.id, User);
    const user = await User.findByPk(req.decodedToken.id);
    const newBlog = {... req.body, userId: user.id};
    const created = await Blog.create(newBlog);
    return res.json(created);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', tokenExtractor, checkBlogCreator,  async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const success = await Blog.destroy({
      where: {
        id: blogId
      }
    });
    console.log(success);
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
