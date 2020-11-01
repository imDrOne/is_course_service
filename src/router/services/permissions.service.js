const models = require('../../db/models');

class PermissionsService {
  static async getUserPermissions(req, res) {
    const { login } = req.headers;

    try {
      let result = await models.Users.findOne({
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
      result = result.permissions.map((value) => ({
        name: value.permissionName,
        code: value.permissionCode,
      }));

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ ...e });
    }
  }

  static async getAllPermissions(req, res) {
    try {
      const permissions = await models.Permissions.findAll({
        attributes: {
          exclude: 'id',
        },
      });

      res.status(200).json(permissions);
    } catch (e) {
      res.status(500).json({ ...e });
    }
  }
}

module.exports = PermissionsService;
