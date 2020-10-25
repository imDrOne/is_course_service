const express = require('express');

const router = express.Router();
const AuthService = require('../services/auth.service');

router.get('/', (req, res) => {
  res.send('Auth controller');
});

/**
 * @mapping
 */
router.post('/login', AuthService.login);
router.get('/check-token', AuthService.checkToken);
router.put('/logout', AuthService.logout);
router.put('/refresh-token', AuthService.refreshToken);

module.exports = router;
