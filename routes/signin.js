const signinRouter = require('express').Router();
const { signInValidation } = require('../middleware/userValidation');

const {
  login,
} = require('../controllers/users');

signinRouter.post('/signin', signInValidation, login);

module.exports = signinRouter;