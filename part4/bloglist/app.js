const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor);
app.use(blogsRouter);
app.use(usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
