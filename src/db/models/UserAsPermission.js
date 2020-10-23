const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsersAsPermissions extends Model {
    static associate(models) {}
  }

  UsersAsPermissions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UsersAsPermissions',
    tableName: 'users_as_permissions',
    timestamps: false,
  });

  return UsersAsPermissions;
};
