const Card = require('../models/card');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER_ERROR = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некоректный запрос' });
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Некоректный запрос' });
      }
      if (err.name === 'CastError') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};
const deletCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Некоректный запрос' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некоректный запрос' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};
const pushLike = (req, res) => {
  const owner = req.user;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      console.log(card._id);
      return res.send({ data: card });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'TypeError') {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Некоректный запрос' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некоректный id карточки' });
      }
      return res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};
const deletLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Некоректный запрос' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некоректный id карточки' });
      }
      return res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deletCard,
  pushLike,
  deletLike,
};