const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../utils/validations');

const { getUser, updateProfile } = require('../controllers/users');
const {
  validateUpdateUser,
} = require('../utils/validations');

const NotFoundError = require('../errors/not-found-error');

router.use(auth);

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateProfile);

router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
