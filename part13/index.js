const express = require("express");
const app = express();

const { PORT } = require('./utils/config');
const { connectToDb } = require('./utils/db');

const blogRouter = require('./controllers/notes')

app.use(express.json());
app.use('api/blogs', blogRouter);

const start = async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
};

start();