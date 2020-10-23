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
    timestamps: false,
  });

  return UsersAsPermissions;
};
