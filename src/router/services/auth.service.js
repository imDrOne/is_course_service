const models = require('../../db/models');
const { auth } = require('../../utils');

const { validatePassword } = auth;

class AuthService {
  static async login(req, res) {
    const { login, password } = req.body;

    const user = await models.Users.findOne({
      where: { email: login },
    });

    if (user === null) {
      res.status(404).send({
        message: 'User not found',
      });
    } else if (validatePassword(password, user.hash, user.salt)) {
      res.status(201).json({
        message: 'Login succeeded',
      });
    } else {
      res.status(400).send({
        message: 'Invalid password',
      });
    }
  }
}

module.exports = AuthService;
