const models = require('../../db/models');
const { auth } = require('../../utils');

const { validatePassword, generateToken, checkToken: check } = auth;

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
      const expAtAccessTime = Math.floor(Date.now() / 1000) + 60 * 2;
      const expAtRefreshTime = Math.floor(Date.now() / 1000) + 60 * 60;

      const accessToken = generateToken({
        login,
        exp: expAtAccessTime,
      });
      const refreshToken = generateToken({
        login,
        exp: expAtRefreshTime,
      });

      try {
        const { id } = await models.Users.findOne({
          where: { email: login },
        });

        console.log(id);

        await models.UserTokens.bulkCreate([
          {
            accessToken,
            refreshToken,
            startDate: new Date(),
            expirationDate: new Date(expAtAccessTime),
            exitDate: new Date(),
            UserId: id,
          },
        ]);

        await models.UserTokens.findAll();
        res.status(201).json({
          message: 'Login succeeded',
          accessToken,
          refreshToken,
        });
      } catch (e) {
        res.status(404);
      }
    } else {
      res.status(400).send({
        message: 'Invalid password',
      });
    }
  }

  static async checkToken(req, res) {
    const { token } = req.headers;

    try {
      await check(token);
      res.status(200).json({
        message: 'Token is valid',
      });
    } catch (err) {
      res.status(400).send({
        message: err,
      });
    }
  }
}

module.exports = AuthService;
