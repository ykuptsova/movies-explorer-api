const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, updateProfile } = require('../controllers/users');
const {
  validateLogin,
} = require('../utils/validations');

router.use(auth);
router.get('/me', validateLogin, getUser);
router.patch('/me', validateLogin, updateProfile);

module.exports = router;
