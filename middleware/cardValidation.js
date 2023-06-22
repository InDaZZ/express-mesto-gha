const { Joi, celebrate } = require('celebrate');

const regex = /https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]{1,256}\.[ru]{1,2}\b([a-zA-Z0-9-._~:/?#@!$&'()*+,;=]*)/;

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().required().hex() }),
});

module.exports = {
  createCardValidation,
  cardIdValidation,
};