const router = require('express').Router();

const userRouter = require('./users');

const cardsRouter = require('./cards');

const ERROR_NOT_FOUND = 404;

router.use('/', userRouter);
router.use('/', cardsRouter);
router.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;