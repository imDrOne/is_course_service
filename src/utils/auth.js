const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash,
  };
};

const validatePassword = (password, srcHash, srcSalt) => {
  const hash = crypto
    .pbkdf2Sync(password, srcSalt, 1000, 64, 'sha512')
    .toString('hex');

  return hash === srcHash;
};

const generateToken = (payload, options) => jwt.sign({ ...payload }, process.env.SECRET, { ...options });

const checkToken = (token) => new Promise((resolve, reject) => jwt.verify(token, process.env.SECRET, (err, decoded) => {
  err ? reject(`Invalid token: ${err.message}`) : resolve(decoded);
}));

const decodeToken = (token) => jwt.decode(token);

module.exports = {
  generateToken,
  checkToken,
  setPassword,
  validatePassword,
  decodeToken,
};
