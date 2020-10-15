const express = require('express');

const router = express.Router();
const UserService = require('../services/users.service');

router.get('', ((req, res) => {
    res.send('Users controller');
}));

router.get('/users', UserService.getAllUsers);
router.get('/userById', UserService.getUserById);

module.exports = router;
