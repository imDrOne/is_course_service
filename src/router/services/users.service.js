const models = require('../../db/models');
const { auth } = require('../../utils');

const { setPassword } = auth;

const excludeOption = {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
};

class UserService {
  static async getAllUsers(req, res) {
    try {
      const users = await models.User.findAll({
        ...excludeOption,
      });
      res.json(users);
    } catch (e) {
      res.json(e);
    }
  }

  static async getUserById(req, res) {
    const { 'user-id': id } = req.headers;

    try {
      const user = await models.User.findOne({
        where: { id },
        ...excludeOption,
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
      await models.User.create({
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
      await models.User.destroy({
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
      await models.User.update(
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
