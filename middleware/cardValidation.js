const { Joi, celebrate } = require('celebrate');
const regex = require('../utils/constans');

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