const Joi = require('joi');

const usersSchemas = {
  userId: {
    'user-id': Joi.number().required(),
  },
  newUser: {
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().optional(),
    email: Joi.string().email(),
    password: Joi.string(),
  },
  updateTest: {
    get() {
      const { password, ...props } = this.newUser;
      return {
        ...props,
        ...this.userId,
      };
    },
  },
};

module.exports = usersSchemas;
