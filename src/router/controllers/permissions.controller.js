const express = require('express');

const router = express.Router();
const PermissionService = require('../services/permissions.service');

const { checkUserPermissions, checkValidToken } = require('../../utils/middlewares');

router.get('/', (req, res) => {
  res.send('Permission controller');
});

router.get(
  '/permissionByUser',
  checkValidToken,
  checkUserPermissions('can__ViewUsers'),
  PermissionService.getUserPermissions,
);

router.get(
  '/permissionsDTO',
  checkValidToken,
  checkUserPermissions('can__CreateUsers', 'can__EditUsers'),
  PermissionService.getAllPermissions,
);

module.exports = router;
