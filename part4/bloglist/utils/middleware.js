/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
    return (
      request, next()
    );
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  request.user = user;
  return (
    request, next()
  );
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'type error' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send(error.message);
  }
  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
module.exports = {
  tokenExtractor, userExtractor, errorHandler, unknownEndpoint,
};
