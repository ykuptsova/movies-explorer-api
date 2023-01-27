const { GENERAL_ERROR } = require('../utils/status-codes');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || GENERAL_ERROR;
  const message = statusCode === GENERAL_ERROR
    ? 'Произошла ошибка'
    : err.message;
  if (process.env.NODE_ENV === 'development') {
    console.log('Error:', err.message);
  }
  res.status(statusCode).send({ message });
  next();
};
