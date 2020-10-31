const { Op } = require('sequelize');

const models = require('../../db/models');
const { auth } = require('../../utils');

const { setPassword } = auth;

const optionsForAllUsers = {
  attributes: {
    exclude: ['hash', 'salt', 'id'],
  },
  include: [{
    as: 'permissions',
    model: models.Permissions,
    attributes: {
      exclude: ['id'],
    },
    through: {
      attributes: [],
    },
  }],
};

/**
* @return Array of objects [ {id: someINT} ]
* */
const getPermissionsIDs = async (permissions) => {
  try {
    return await models.Permissions.findAll({
      attributes: ['id'],
      where: {
        permissionCode: {
          [Op.or]: permissions,
        },
      },
    });
  } catch (e) {
    return e;
  }
};

class UserService {
  static async getAllUsers(req, res) {
    try {
      const users = await models.Users.findAll({ ...optionsForAllUsers });
      res.json(users);
    } catch (e) {
      res.json(e);
    }
  }

  static async getUserById(req, res) {
    const { 'user-id': id } = req.headers;

    try {
      const user = await models.Users.findOne({
        where: { id },
      });
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  }

  static async createUser(req, res) {
    const {
      firstName, lastName, email, password, permissions,
    } = req.body;

    const { salt, hash } = setPassword(password);

    try {
      const user = await models.Users.create({
        firstName,
        lastName,
        email,
        salt,
        hash,
      });

      const permissionsIDs = await getPermissionsIDs([...permissions]);

      const userAsPermissions = permissionsIDs.map((permission) => ({
        userId: user.id,
        permissionId: permission.id,
      }));

      await models.UsersAsPermissions.bulkCreate([...userAsPermissions]);

      const updatedUserList = await UserService.getAllUsers(req, res);
      res.status(201).json(updatedUserList);
    } catch (e) {
      res.status(500).json({ ...e });
    }
  }

  static async deleteUserById(req, res) {
    const { 'user-id': id } = req.headers;

    try {
      await models.Users.destroy({
        where: { id },
      });
      const updatedUserList = await UserService.getAllUsers(req, res);
      res.json(updatedUserList);
    } catch (e) {
      res.json(e);
    }
  }

  static async updateUserById(req, res) {
    const {
      oldEmail, newEmail, ...body
    } = req.body;

    try {
      await models.Users.update(
        { email: newEmail, ...body },
        { where: { email: oldEmail } },
      );

      const user = await models.Users.findOne({
        where: { email: newEmail || oldEmail },
      });

      if (body.permissions) {
        const permissionsIDs = await getPermissionsIDs([body.permissions]);
        const userAsPermissions = permissionsIDs.map((permission) => ({
          userId: user.id,
          permissionId: permission.id,
        }));
        await models.UsersAsPermissions.destroy({
          where: { userId: user.id },
        });
        await models.UsersAsPermissions.bulkCreate([...userAsPermissions]);
      }

      const users = await models.Users.findAll({ ...optionsForAllUsers });
      res.status(201).json(users);
    } catch (e) {
      res.status(500).json({ ...e });
    }
  }
}

module.exports = UserService;
