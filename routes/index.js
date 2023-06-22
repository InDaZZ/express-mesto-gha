const router = require('express').Router();

const userRouter = require('./users');

const cardsRouter = require('./cards');

const signinRouter = require('./signin');

const signupRouter = require('./signup');

const auth = require('../middleware/auth');

const NotFoundError = require('../error/not-found-err');

router.use('/', signinRouter);
router.use('/', signupRouter);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;