const cardsRouter = require('express').Router();

const { createCardValidation, cardIdValidation } = require('../middleware/cardValidation');

const {
  getCards, createCard, deletCard, pushLike, deletLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCardValidation, createCard);
cardsRouter.delete('/cards/:cardId', cardIdValidation, deletCard);
cardsRouter.put('/cards/:cardId/likes', cardIdValidation, pushLike);
cardsRouter.delete('/cards/:cardId/likes', cardIdValidation, deletLike);

module.exports = cardsRouter;