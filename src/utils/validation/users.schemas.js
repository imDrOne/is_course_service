const Joi = require('joi');

const userId = {
  'user-id': Joi.number().required(),
};

const newUser = {
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

const updateUser = {
  get() {
    const { password, email, ...props } = newUser;
    return {
      id: Joi.number().required(),
      email: Joi.string().email().optional(),
      ...props,
    };
  },
};

module.exports = {
  newUser,
  userId,
  updateUser,
};
