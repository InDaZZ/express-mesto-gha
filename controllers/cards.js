const Card = require('../models/card');
const NotFoundError = require('../error/not-found-err');
const BadRequest = require('../error/bad-request-err');
const RejectedErr = require('../error/rejected-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
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
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
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
const deletCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        console.log(card);
        throw new NotFoundError('Карточки с таким id не существует');
      }
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new RejectedErr('Нельзя удалить карточку другого пользователя');
      }
      Card.deleteOne(card._id)
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};
const pushLike = (req, res, next) => {
  const owner = req.user;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      console.log(card._id);
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new RejectedErr('Вы не можете удалить карточку другого пользователя');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Некоректный запрос'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      if (err.name === 'TypeError') {
        return next(new NotFoundError('Переданы невалидные данные'));
      }
      return next(err);
    });
};
const deletLike = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Некоректный запрос');
      }
      return res.send({ data: card });
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

module.exports = {
  getCards,
  createCard,
  deletCard,
  pushLike,
  deletLike,
};