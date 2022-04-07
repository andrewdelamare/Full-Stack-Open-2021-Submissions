const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/api/users", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUsers = await User.find({ username: `${username}` });
  const isFound = existingUsers.length;
  if (username.length <= 2) {
    response.status(400).json({ error: "username too short" });
  } else if (password.length <= 2) {
    response.status(400).json({ error: "password too short" });
  } else if (isFound >= 1) {
    response.status(400).json({ error: "username already exists" });
  } else if (isFound === 0) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

usersRouter.get("/api/users", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users);
});

module.exports = usersRouter;
