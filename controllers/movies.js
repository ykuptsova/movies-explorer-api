const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const AccessDeniedError = require('../errors/access-denied-error');
const BadRequestError = require('../errors/bad-request-error');
const {
  CREATED,
} = require('../utils/status-codes');

// GET movies
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

// POST movies
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie
    .create({ ...req.body, owner })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

// DELETE movies
module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.movieId)
    .orFail(new NotFoundError())
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        next(new AccessDeniedError());
      } else {
        movie.remove()
          .then(() => res.send({ data: movie }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};
