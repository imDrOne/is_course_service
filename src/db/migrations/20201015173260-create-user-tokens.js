const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('user_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accessToken: {
        allowNull: false,
        type: Sequelize.STRING(1024),
      },
      refreshToken: {
        allowNull: false,
        type: Sequelize.STRING(1024),
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      expirationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      exitDate: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_tokens');
  },
};
