const express = require('express');

const router = express.Router();
const AuthService = require('../services/auth.service');

const { checkRequest } = require('../../utils/middlewares');

const {
  authValidationSchemas: {
    loginSchema,
    refreshTokenSchema,
    singleAccessTokenSchema,
  },
} = require('../../utils/validation');

router.get('/', (req, res) => {
  res.send('Auth controller');
});

/**
 * @mapping
 */
router.post(
  '/login',
  checkRequest(loginSchema, 'body'),
  AuthService.login,
);

router.get(
  '/check-token',
  checkRequest(singleAccessTokenSchema, 'headers'),
  AuthService.checkToken,
);

router.put(
  '/logout',
  checkRequest(singleAccessTokenSchema, 'headers'),
  AuthService.logout,
);

router.put(
  '/refresh-token',
  checkRequest(refreshTokenSchema, 'headers'),
  AuthService.refreshToken,
);

module.exports = router;
