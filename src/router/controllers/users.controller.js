const express = require('express');

const router = express.Router();
const UserService = require('../services/users.service');

const { userValidations } = require('../../utils/middlewares');

const {
  usersValidationSchemas: {
    updateTest,
    newUser,
    userId,
  },
} = require('../../utils/validation');

router.get('/', ((req, res) => {
  res.send('Users controller');
}));

/**
 * @mapping
 */
router.get(
  '/users',
  UserService.getAllUsers,
);

router.get(
  '/userById',
  userValidations(userId, 'headers'),
  UserService.getUserById,
);

router.post(
  '/newUser',
  userValidations(newUser, 'body'),
  UserService.createUser,
);

router.delete(
  '/delUserById',
  userValidations(userId, 'headers'),
  UserService.deleteUserById,
);

router.put(
  '/updateUserById',
  userValidations(updateTest, 'body'),
  UserService.updateUserById,
);

module.exports = router;
