const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  return res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const newBlog = req.body;
    console.log(newBlog);
    const created = await Blog.create(newBlog);
    return res.json(created);
  } catch (error) {
    res.status(404).end();
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const found = await Blog.findByPk(blogId);
    console.log(found);
    if (found){ 
      await Blog.destroy({
        where: {
          id: blogId
        }
      });
    return res.status(200).send();
  } else {
    return res.status(400).send("This blog does not exist")
  }
  } catch (error) {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const found = await Blog.findByPk(blogId);
    const likes = req.body.likes;

    if (found && likes){ 
      await Blog.update({ likes }, {
        where: {
          id: blogId
        }
      });
    return res.status(200).send();
  }
  } catch (error) {
    res.status(404).end();
  }
})

module.exports = router;
