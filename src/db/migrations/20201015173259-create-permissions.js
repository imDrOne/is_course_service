module.exports = {
  up: async (queryInterface, Sequelize) => {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  },
};
