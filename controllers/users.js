const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../error/not-found-err');
const BadRequest = require('../error/bad-request-err');
const Emailexists = require('../error/email-exists-err');

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};
const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  console.log(req.query);
  User.findById(userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};
const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      return next(err);
    });
};
const creatUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      console.log(user);
      return res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new Emailexists('Email уже исользуется'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });

      // вернём токен
      res
        .cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      console.log(user.name.length);
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Emailexists('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  creatUser,
  updateUser,
  updateUserAvatar,
  login,
  getUserMe,
};