const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    static associate(models) {
      Permissions.belongsToMany(models.Users, {
        through: 'UsersAsPermissions',
        foreignKey: 'permissionId',
        as: 'users',
      });
    }
  }
  Permissions.init({
    permissionName: DataTypes.STRING,
    permissionCode: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Permissions',
    tableName: 'permissions',
  });

  return Permissions;
};
