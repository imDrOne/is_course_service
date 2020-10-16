module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    {
      tableName: 'Permissions',
      schema: 'main',
    },
    'userId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn(
    {
      tableName: 'Permissions',
      schema: 'main',
    },
    'UserId',
  ),
};
