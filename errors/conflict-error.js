const { CODE_CONFLICT } = require('../utils/status-codes');
const { MSG_DUPLICATED_EMAIL } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message || MSG_DUPLICATED_EMAIL);
    this.statusCode = CODE_CONFLICT; // 409
  }
}

module.exports = ConflictError;
