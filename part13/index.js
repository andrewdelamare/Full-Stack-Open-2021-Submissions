require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')
const express = require("express");
const app = express();
app.use(express.json());


const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });
    blogs.forEach(b => console.log(`${b.author}: ${b.title}, ${b.likes} likes`));
    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'Blog'
})

Blog.sync();

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = req.body;
    console.log(newBlog);
    const created = await Blog.create(newBlog);
    return res.json(created);
  } catch (error) {
    res.status(404).end()
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const destroyed = await Blog.destroy({
      where: {
        id: blogId
      }
    });
    return res.status(200).json(destroyed)
  } catch (error) {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})