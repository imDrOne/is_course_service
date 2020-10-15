const express = require('express');

const router = express.Router();
const AuthService = require('../services/auth.service');

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
router.get('/', (req, res) => {
  res.send('Auth controller');
});

router.post('/login', AuthService.login);

module.exports = router;
