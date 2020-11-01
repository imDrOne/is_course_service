const Joi = require('joi');

const loginSchema = {
  login: Joi.string().email().required(),
  password: Joi.string().required(),
};

const singleAccessTokenSchema = {
  token: Joi.string().token(),
};

const refreshTokenSchema = {
  'access-token': Joi.string().token(),
  'refresh-token': Joi.string().token(),
};

module.exports = {
  loginSchema,
  singleAccessTokenSchema,
  refreshTokenSchema,
};
