const express = require('express');

const router = express.Router();
const UserService = require('../services/users.service');

const { checkRequest, checkValidToken, checkUserPermissions } = require('../../utils/middlewares');

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
  checkValidToken,
  checkUserPermissions('can__ViewUsers'),
  UserService.getAllUsers,
);

router.get(
  '/userById',
  checkValidToken,
  checkRequest(userId, 'headers'),
  UserService.getUserById,
);

router.post(
  '/newUser',
  checkValidToken,
  checkRequest(newUser, 'body'),
  checkUserPermissions('can__CreateUsers'),
  UserService.createUser,
);

router.delete(
  '/delUserById',
  checkValidToken,
  checkRequest(userId, 'headers'),
  UserService.deleteUserById,
);

router.put(
  '/updateUserById',
  checkValidToken,
  checkRequest(updateUser, 'body'),
  checkUserPermissions('can__EditUsers'),
  UserService.updateUserById,
);

module.exports = router;
