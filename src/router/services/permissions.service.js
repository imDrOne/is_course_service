const models = require('../../db/models');

class PermissionsService {
  static async getUserPermissions(req, res) {
    const { id } = req.headers;

    try {
      let result = await models.Users.findOne({
        where: { id },
        attributes: [],
        include: [{
          as: 'permissions',
          model: models.Permissions,
          through: {
            attributes: [],
          },
        }],
      });
      result = result.permissions.map((value) => value.permissionName);

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ ...e });
    }
  }
}

module.exports = PermissionsService;
