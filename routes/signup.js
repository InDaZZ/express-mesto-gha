const signupRouter = require('express').Router();

const { signUpValidation } = require('../middleware/userValidation');

const {
  creatUser,
} = require('../controllers/users');

signupRouter.post('/signup', signUpValidation, creatUser);

module.exports = signupRouter;