const expressRateLimit = require('express-rate-limit');

// максимум 100 запросов с одного IP за 1 минуту
module.exports.rateLimiter = expressRateLimit({
  max: 100,
  windowMs: 60 * 1000,
});
