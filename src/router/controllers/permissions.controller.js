const express = require('express');

const router = express.Router();
const PermissionService = require('../services/permissions.service');

router.get('/', (req, res) => {
  res.send('Permission controller');
});

router.get('/permissionByUser', PermissionService.getUserPermissions);

module.exports = router;
