const cardsRouter = require('express').Router();

const {
  getCards, createCard, deletCard, pushLike, deletLike,
} = require('../controllers/cards');

cardsRouter.post('/cards', createCard);
cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId', deletCard);
cardsRouter.put('/cards/:cardId/likes', pushLike);
cardsRouter.delete('/cards/:cardId/likes', deletLike);

module.exports = cardsRouter;