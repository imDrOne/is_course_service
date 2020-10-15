const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {
    }
  }
  Permissions.init({
    permissionName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Permissions',
  });
  return Permissions;
};
