const { UNAUTHORIZED } = require('../utils/status-codes');
const { MSG_NEED_AUTHORIZATION } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || MSG_NEED_AUTHORIZATION);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
