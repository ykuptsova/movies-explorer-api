const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { jwtSecret } = require('../utils/constants');

// проверяем наличие токена и верифицируем его
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    next(new UnauthorizedError());
    return;
  }

  req.user = payload;
  next();
};
