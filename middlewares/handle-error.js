const { GENERAL_ERROR } = require('../utils/status-codes');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || GENERAL_ERROR;
  const message = statusCode === GENERAL_ERROR
    ? 'Произошла ошибка'
    : err.message;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  res.status(statusCode).send({ message });
  next();
};
