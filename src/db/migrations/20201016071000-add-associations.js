const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => queryInterface
    .createTable('users_as_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      permissionId: {
        type: Sequelize.INTEGER,
        references: { model: 'permissions', key: 'id' },
        onDelete: 'CASCADE',
      },
    })
    .then(() => queryInterface.addColumn(
      {
        tableName: 'user_tokens',
        schema: 'main',
      },
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )),

  down: async (queryInterface) => queryInterface
    .dropTable('users_as_permissions')
    .then(() => queryInterface.removeColumn({
      tableName: 'user_tokens',
      schema: 'main',
    }, 'userId')),
};
