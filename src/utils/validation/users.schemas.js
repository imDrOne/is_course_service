const Joi = require('joi');

const userId = {
  'user-id': Joi.number().required(),
};

const newUser = {
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  permissions: Joi.array().items(Joi.string()).required(),
};

const updateUser = {
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().optional(),
  newEmail: Joi.string().email().optional(),
  oldEmail: Joi.string().email().required(),
  permissions: Joi.array().items(Joi.string()).optional(),
};

module.exports = {
  newUser,
  userId,
  updateUser,
};
