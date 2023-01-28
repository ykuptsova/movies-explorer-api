const { DENIED } = require('../utils/status-codes');
const { MSG_ACCESS_DENIED } = require('../utils/constants');

class AccessDeniedError extends Error {
  constructor(message) {
    super(message || MSG_ACCESS_DENIED);
    this.statusCode = DENIED;
  }
}

module.exports = AccessDeniedError;
