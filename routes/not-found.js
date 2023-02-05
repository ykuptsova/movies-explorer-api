const router = require('express').Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use(auth);

router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
