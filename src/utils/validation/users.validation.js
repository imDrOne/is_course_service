const Joi = require('joi');

module.exports = () => Joi.object({
  id: [
    Joi.number().required(),
    Joi.string().required(),
  ],
  firstName: Joi.string()
    .required(),

  lastName: Joi.string(),

  email: Joi.string()
    .required()
    .email(),

  password: Joi.string()
    .required()
    .min(8),
});
