const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./utils/errorHandler');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(blogsRouter);
app.use(usersRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler.errorHandler);
app.use(errorHandler.unknownEndpoint);

module.exports = app;
