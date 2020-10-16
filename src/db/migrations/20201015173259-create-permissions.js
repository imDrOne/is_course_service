const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      permissionName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        default: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        default: new Date(),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Permissions');
  },
};
