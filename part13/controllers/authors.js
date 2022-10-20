const router = require("express").Router();
const { Blog } = require("../models");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      [sequelize.fn("COUNT", "author"), "articles"],
    ],
    order: [["likes", "DESC"]],
  });
  return res.json(authors);
});

module.exports = router;
