const Blog = require("./blog");
const User = require("./user");

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })

;

module.exports = {
  Blog, 
  User
};