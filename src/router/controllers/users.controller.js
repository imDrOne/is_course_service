const express = require('express');

const router = express.Router();
const UserService = require('../services/users.service');

router.get('/', ((req, res) => {
  res.send('Users controller');
}));

/**
 * @mapping
 */
router.get('/users', UserService.getAllUsers);
router.get('/userById', UserService.getUserById);
router.post('/newUser', UserService.createUser);
router.delete('/delUserById', UserService.deleteUserById);
router.put('/updateUserById', UserService.updateUserById);

module.exports = router;
