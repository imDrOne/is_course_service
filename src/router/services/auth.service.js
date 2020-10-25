/* eslint-disable prefer-promise-reject-errors */

const { DateTime } = require('luxon');
const { Op } = require('sequelize');
const models = require('../../db/models');
const { auth } = require('../../utils');

const { validatePassword, generateToken, checkToken: check } = auth;

const findActiveToken = async (userId) => {
  try {
    return await models.UserTokens.findOne({
      where: {
        expirationDate: {
          [Op.gt]: DateTime.local().plus({ hours: 3 }).toString(),
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
      startDate: DateTime.local().plus({ hours: 3 }).toString(), // because i fuck this timezone
      expirationDate: expAtAccessTime.plus({ hours: 3 }), // because i fuck this timezone
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
        const oldActivePair = await findActiveToken(user.id);
        if (oldActivePair) {
          const { accessToken, refreshToken } = oldActivePair;
          res.status(200).json({
            accessToken,
            refreshToken,
          });
          return;
        }

        const pairTokens = await writeUpNewToken(login);
        res.status(200).json({ ...pairTokens });
      } catch (e) {
        res.status(422).send({ e });
      }
    } else {
      res.status(401).send({
        message: 'Invalid password',
      });
    }
  }

  static async checkToken(req, res) {
    const { token, 'user-id': userId } = req.headers;

    try {
      const user = await findActiveToken(userId);

      if (!user) {
        await Promise.reject('Session is already expired');
      }

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

  static async logout(req, res) {
    const { 'user-id': userId } = req.headers;

    try {
      await models.UserTokens.update({
        exitDate: DateTime.local().plus({ hours: 3 }).toString(),
      },
      {
        where: {
          expirationDate: {
            [Op.gt]: DateTime.local().plus({ hours: 3 }).toString(),
          },
          userId,
        },
      });

      res.status(200).json({
        message: 'Success exit',
      });
    } catch (e) {
      res.status(422).send({ e });
    }
  }

  static async refreshToken(req, res) {
    const { 'refresh-token': refreshToken, 'access-token': accessToken, login } = req.headers;

    try {
      await check(refreshToken);
      const expAtAccessTime = DateTime.local().plus({ minutes: 1 });

      const newAccessToken = generateToken({
        login,
        exp: expAtAccessTime.toSeconds(),
      });

      const result = await models.UserTokens.update({
        accessToken: newAccessToken,
        expirationDate: expAtAccessTime.plus({ hours: 3 }),
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
    } catch (e) {
      res.status(422).send({ e });
    }
  }
}

module.exports = AuthService;
