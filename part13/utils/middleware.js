const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Blog, User } = require("../models");

const checkForPk = async (pk, model) => {
  const row = await model.findByPk(pk);
  if (row === null) {
    throw new Error("Entry does not exist!");
  }
};

const checkUnique = async (val, col, model) => {
  let results;
  if (col === "username") {
    results = await model.findAll({
      where: {
        username: val,
      },
    });
    console.log(results);
  } else {
    throw new Error(
      "This method only handles username checking, please expand it to check other columns if needed."
    );
  }

  if (results.length > 1) {
    throw new Error("Not unique!");
  } else if (results === null) {
    throw new Error("Entry does not exist!");
  }
};

const checkNonexistence = async (val, col, model) => {
  let results;
  if (col === "username") {
    results = await model.findAll({
      attributes: ["username"],
      where: {
        username: val,
      },
    });
  } else {
    throw new Error(
      "This method only handles username checking, please expand it to check other columns if needed."
    );
  }
  console.log(results);
  if (results.length > 0) {
    throw new Error("An entry with this value already exists!");
  }
};

const checkBlogCreator = async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findByPk(blogId);
  if (blog === null) {
    return res.status(400).json({ error: "Entry does not exist!" });
  } else if (blog.userId !== req.decodedToken.id) {
    return res.status(401).json({ error: "User did not create this blog" });
  }
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "Token invalid" });
    }
  } else {
    return res.status(401).json({ error: "Token missing" });
  }
  next();
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.message === "Entry does not exist!") {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  checkForPk,
  checkUnique,
  checkNonexistence,
  checkBlogCreator,
  tokenExtractor,
  errorHandler,
};
