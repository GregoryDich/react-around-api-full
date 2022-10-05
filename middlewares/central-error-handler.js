const centralErrorHandler = (err, res) => {
  if (err.name === 'MongoServerError') {
    res.status(409).send({ message: 'This email already in use' });
  }
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Invalid data' });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};
module.exports = centralErrorHandler;
