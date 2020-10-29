const express = require('express');

const router = express.Router();
const UserService = require('../services/users.service');

const { userValidations, guard } = require('../../utils/middlewares');

const {
  usersValidationSchemas: {
    updateUser,
    userId,
    newUser,
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
  guard,
  UserService.getAllUsers,
);

router.get(
  '/userById',
  guard,
  userValidations(userId, 'headers'),
  UserService.getUserById,
);

router.post(
  '/newUser',
  guard,
  userValidations(newUser, 'body'),
  UserService.createUser,
);

router.delete(
  '/delUserById',
  guard,
  userValidations(userId, 'headers'),
  UserService.deleteUserById,
);

router.put(
  '/updateUserById',
  guard,
  userValidations(updateUser.get(), 'body'),
  UserService.updateUserById,
);

module.exports = router;
