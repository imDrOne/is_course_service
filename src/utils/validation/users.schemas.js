const Joi = require('joi');

const userId = {
  'user-id': Joi.number().required(),
};

const newUser = {
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().optional(),
  email: Joi.string().email(),
  password: Joi.string(),
};

const updateUser = {
  get() {
    const { password, ...props } = newUser;
    return {
      id: Joi.number().required(),
      ...props,
    };
  },
};

module.exports = {
  newUser,
  userId,
  updateUser,
};
