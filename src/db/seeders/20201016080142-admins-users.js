const dotenv = require('dotenv');

dotenv.config();

const { auth: { setPassword } } = require('../../utils');

const adminPswd = process.env.USER_ADMIN_PSWD;
const { hash, salt } = setPassword(adminPswd);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Admin',
      email: 'admin@mail.ru',
      hash,
      salt,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
