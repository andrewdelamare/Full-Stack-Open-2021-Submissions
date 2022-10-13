const router = require('express').Router();
const { checkUnique, checkNonexistence } = require("../utils/middleware");

const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
});

router.post('/', async (req, res, next) => {
  try {
    const user = req.body
    await checkNonexistence(user.username, "username", User);
    const result = await User.create(req.body);
    res.json(result);
  } catch(error) {
    next(error)
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    const user = req.params.username;
    const update = req.body.username; 
    await checkUnique(user, "username", User); 
    const updated = await User.update({ username: update }, {
      where: {
        username: user
      }
    });
    console.log(updated); 
    return res.status(200).send();
  } catch (error) {
    next(error)
  }
})

module.exports = router;