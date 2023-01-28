const { NOT_FOUND } = require('../utils/status-codes');
const { MSG__NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message || MSG__NOT_FOUND);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
