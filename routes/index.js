const router = require('express').Router();

const userRouter = require('./users');

const cardsRouter = require('./cards');

const signinRouter = require('./signin');

const signupRouter = require('./signup');

const auth = require('../middleware/auth');

const ERROR_NOT_FOUND = 404;

router.use('/', signinRouter);
router.use('/', signupRouter);

router.use('/', auth);

router.use('/', userRouter);
router.use('/', cardsRouter);
router.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

module.exports = router;