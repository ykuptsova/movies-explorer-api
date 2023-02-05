const router = require('express').Router();

router.use(require('./crash-test'));
router.use(require('./auth'));
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));
router.use(require('./not-found'));

module.exports = router;
