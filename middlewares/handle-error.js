const { GENERAL_ERROR } = require('../utils/status-codes');
const { MSG_ERROR_OCCURRED } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || GENERAL_ERROR;
  const message = statusCode === GENERAL_ERROR
    ? MSG_ERROR_OCCURRED
    : err.message;
  if (process.env.NODE_ENV === 'development') {
    console.log('Error:', err.message);
  }
  res.status(statusCode).send({ message });
  next();
};
