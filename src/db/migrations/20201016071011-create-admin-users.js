const dotenv = require('dotenv');

dotenv.config();

const { auth: { setPassword } } = require('../../utils');

const adminPswd = process.env.USER_ADMIN_PSWD;
const { hash, salt } = setPassword(adminPswd);

const records = [
  {
    firstName: 'Admin',
    email: 'admin@mail.ru',
    hash,
    salt,
  },
  {
    firstName: 'Admin2',
    email: 'admin2@mail.ru',
    hash,
    salt,
  },
  {
    firstName: 'Admin3',
    email: 'admin3@mail.ru',
    hash,
    salt,
  },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
