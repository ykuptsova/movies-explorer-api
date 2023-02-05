const router = require('express').Router();
const { MSG_SERVER_GOES_DOWN } = require('../utils/constants');

// краш-тест сервера
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(MSG_SERVER_GOES_DOWN);
  }, 0);
});

module.exports = router;
