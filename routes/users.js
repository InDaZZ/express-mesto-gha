const userRouter = require('express').Router();
const {
  getUsers, getUser, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');
const { getUserValidation, updateUserValidation, updateUserAvatarValidation } = require('../middleware/userValidation');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getUserMe);
userRouter.get('/users/:userId', getUserValidation, getUser);
userRouter.patch('/users/me', updateUserValidation, updateUser);
userRouter.patch('/users/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = userRouter;