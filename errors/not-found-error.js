const { NOT_FOUND } = require('../utils/status-codes');
const { MSG_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message || MSG_NOT_FOUND);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
