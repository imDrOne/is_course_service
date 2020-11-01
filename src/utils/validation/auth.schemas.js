const Joi = require('joi');

const loginSchema = {
  login: Joi.string().email().required(),
  password: Joi.string().required(),
};

const singleAccessTokenSchema = {
  token: Joi.string().required(),
};

const refreshTokenSchema = {
  'access-token': Joi.string().required(),
  'refresh-token': Joi.string().required(),
};

module.exports = {
  loginSchema,
  singleAccessTokenSchema,
  refreshTokenSchema,
};
