const { Blog } = require("../models");

const checkForExistence = async (pk) => {
  const row = await Blog.findByPk(pk);
  if (row === null) {
    throw new Error("Entry does not exist!")
  }
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.message === "Entry does not exist!"){
    res.status(400).send(error.message);
  } else {
    res.status(400).send(error.message);
  }
  next(error);
}

module.exports = {
  checkForExistence,
  errorHandler
};