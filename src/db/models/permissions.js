const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {}
  }
  Permissions.init({
    permissionName: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};
