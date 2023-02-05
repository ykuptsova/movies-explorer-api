const router = require('express').Router();

const auth = require('../middlewares/auth');

const { getUser, updateProfile } = require('../controllers/users');
const {
  validateUpdateUser,
} = require('../utils/validations');

router.use(auth);

router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateProfile);

module.exports = router;
