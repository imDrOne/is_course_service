const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => queryInterface.addColumn(
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

  down: async (queryInterface) => queryInterface.removeColumn(
    {
      tableName: 'Permissions',
      schema: 'main',
    },
    'userId',
  ),
};
