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
module.exports = { errorHandler, unknownEndpoint };
