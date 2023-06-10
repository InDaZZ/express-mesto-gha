const Card = require('../models/card');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_INTERNAL_SERVER_ERROR = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
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
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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
const deletCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => res.send({ data: card }))
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
const pushLike = (req, res) => {
  const owner = req.user;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => res.send({ data: card }))
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
const deletLike = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => res.send({ data: card }))
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
  getCards,
  createCard,
  deletCard,
  pushLike,
  deletLike,
};