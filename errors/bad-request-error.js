const { BAD_REQUEST } = require('../utils/status-codes');
const { MSG_BAD_REQUEST } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message || MSG_BAD_REQUEST);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
