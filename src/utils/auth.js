const crypto = require('crypto');

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

module.exports = {
  setPassword,
  validatePassword,
};
