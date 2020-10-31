const models = require('../../db/models');
const { auth } = require('../../utils');

const { setPassword } = auth;

class UserService {
  static async getAllUsers(req, res) {
    try {
      const users = await models.Users.findAll({
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
      });
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
      firstName, lastName, email, password,
    } = req.body;

    const { salt, hash } = setPassword(password);

    try {
      await models.Users.create({
        firstName,
        lastName,
        email,
        salt,
        hash,
      });
      const updatedUserList = await UserService.getAllUsers(req, res);
      res.json(updatedUserList);
    } catch (e) {
      res.json(e);
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
      id, ...body
    } = req.body;

    try {
      await models.Users.update(
        { ...body },
        { where: { id } },
      );

      const updatedUserList = await UserService.getAllUsers(req, res);
      res.json(updatedUserList);
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = UserService;
