const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(blogsRouter);

module.exports = app;
