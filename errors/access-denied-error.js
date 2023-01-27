const { DENIED } = require('../utils/status-codes');

class AccessDeniedError extends Error {
  constructor(message) {
    // constants.ACCESS_DENIED
    super(message || 'Отказано в доступе');
    this.statusCode = DENIED;
  }
}

module.exports = AccessDeniedError;
