const User = require('../models/user');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER_ERROR = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(`Ошибка ${ERROR_BAD_REQUEST}`);
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send(`Ошибка ${ERROR_NOT_FOUND}`);
      }
      res.status(500).send(`Ошибка ${ERROR_INTERNAL_SERVER_ERROR}`);
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(`Ошибка ${ERROR_BAD_REQUEST}`);
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send(`Ошибка ${ERROR_NOT_FOUND}`);
      }
      res.status(500).send(`Ошибка ${ERROR_INTERNAL_SERVER_ERROR}`);
    });
};
const creatUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(`Ошибка ${ERROR_BAD_REQUEST}`);
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send(`Ошибка ${ERROR_NOT_FOUND}`);
      }
      res.status(500).send(`Ошибка ${ERROR_INTERNAL_SERVER_ERROR}`);
    });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(`Ошибка ${ERROR_BAD_REQUEST}`);
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send(`Ошибка ${ERROR_NOT_FOUND}`);
      }
      res.status(500).send(`Ошибка ${ERROR_INTERNAL_SERVER_ERROR}`);
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.send(`Ошибка ${ERROR_BAD_REQUEST}`);
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send(`Ошибка ${ERROR_NOT_FOUND}`);
      }
      res.status(500).send(`Ошибка ${ERROR_INTERNAL_SERVER_ERROR}`);
    });
};

module.exports = {
  getUsers,
  getUser,
  creatUser,
  updateUser,
  updateUserAvatar,
};