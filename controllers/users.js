const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const {
  CREATED,
} = require('../utils/status-codes');

// GET users/me
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({ data: user });
    })
    .catch(next);
};

// POST signup
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(CREATED).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else if (err.code === 11000) {
        next(new ConflictError());
      } else {
        next(err);
      }
    });
};

// POST signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  let userId;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return false;
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Переданы неверный email или пароль');
      }
      const { JWT_SECRET } = process.env;
      const payload = { _id: userId };
      const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};
