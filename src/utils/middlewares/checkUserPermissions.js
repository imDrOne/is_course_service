const models = require('../../db/models');
const { verifyToken } = require('../auth.utils');

module.exports = (permission) => async (req, res, next) => {
  const { token } = req.headers;

  try {
    const { login } = await verifyToken(token);
    const user = await models.Users.findOne({
      where: { email: login },
      attributes: [],
      include: [{
        as: 'permissions',
        model: models.Permissions,
        through: {
          attributes: [],
        },
      }],
    });
    const userPermissions = user.permissions.map((value) => value.permissionCode);
    if (userPermissions.includes(permission)) {
      next();
    } else res.status(403).send('Access denied');
  } catch (e) {
    res.status(500).json({ ...e });
  }
};
