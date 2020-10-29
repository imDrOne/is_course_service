/* eslint-disable prefer-promise-reject-errors */

const { DateTime } = require('luxon');
const { Op } = require('sequelize');
const models = require('../../db/models');
const { auth } = require('../../utils');

const {
  validatePassword,
  generateToken,
  decodeToken,
  verifyToken,
} = auth;

const findActiveSession = async (userId) => {
  try {
    return await models.UserTokens.findOne({
      where: {
        expirationDate: {
          [Op.gt]: DateTime.local().toString(),
        },
        exitDate: {
          [Op.is]: null,
        },
        userId,
      },
    });
  } catch (e) {
    return e;
  }
};

const writeUpNewToken = async (login) => {
  const expAtAccessTime = DateTime.local().plus({ minutes: 1 });
  const expAtRefreshTime = DateTime.local().plus({ hours: 8 });

  const accessToken = generateToken({
    login,
    exp: expAtAccessTime.toSeconds(),
  });

  const refreshToken = generateToken({
    login,
    exp: expAtRefreshTime.toSeconds(),
  });

  try {
    const { id } = await models.Users.findOne({
      where: { email: login },
    });

    await models.UserTokens.create({
      accessToken,
      refreshToken,
      startDate: DateTime.local().toString(),
      expirationDate: expAtAccessTime,
      userId: id,
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    return e;
  }
};

const findUserIdByLogin = async (login) => {
  try {
    return await models.Users.findOne({
      where: { email: login },
    });
  } catch (e) {
    return e;
  }
};

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

      return;
    }

    if (validatePassword(password, user.hash, user.salt)) {
      try {
        let pairTokens = await findActiveSession(user.id);
        if (!pairTokens) {
          pairTokens = await writeUpNewToken(login);
        }

        const { accessToken, refreshToken } = pairTokens;
        res.status(200).json({ accessToken, refreshToken });
      } catch (e) {
        res.status(422).send({ ...e });
      }
    } else {
      res.status(401).send({
        message: 'Invalid password',
      });
    }
  }

  static async checkToken(req, res) {
    const { token } = req.headers;

    try {
      const { login } = await verifyToken(token);
      const { id: userId } = await findUserIdByLogin(login);
      const session = await findActiveSession(userId);

      if (!session) {
        await Promise.reject('Session is already expired');
      }

      res.status(200).json({
        message: 'Token is valid',
      });
    } catch (err) {
      console.error(err);
      res.status(403).send({
        message: err,
      });
    }
  }

  static async logout(req, res) {
    const { token: accessToken } = req.headers;

    try {
      const { login } = decodeToken(accessToken);
      const { id: userId } = await findUserIdByLogin(login);

      await models.UserTokens.update({
        exitDate: DateTime.local().toString(),
      },
      {
        where: {
          accessToken,
          userId,
        },
      });

      res.status(200).json({
        message: 'Success exit',
      });
    } catch (err) {
      res.status(403).send({
        message: err,
      });
    }
  }

  static async refreshToken(req, res) {
    const { 'refresh-token': refreshToken, 'access-token': accessToken } = req.headers;

    try {
      await verifyToken(refreshToken);
      const { login } = decodeToken(accessToken);
      const expAtAccessTime = DateTime.local().plus({ minutes: 1 });

      const newAccessToken = generateToken({
        login,
        exp: expAtAccessTime.toSeconds(),
      });

      const result = await models.UserTokens.update({
        accessToken: newAccessToken,
        expirationDate: expAtAccessTime,
      }, {
        where: {
          accessToken,
          refreshToken,
          exitDate: {
            [Op.is]: null,
          },
        },
      });

      if (!result[0]) await Promise.reject('Session is already expired');

      res.status(201).json({
        accessToken: newAccessToken,
      });
    } catch (err) {
      res.status(403).send({
        message: err,
      });
    }
  }
}

module.exports = AuthService;
