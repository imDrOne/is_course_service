const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTokens extends Model {
    static associate(models) {}
  }

  UserTokens.init({
    accessToken: {
      allowNull: false,
      type: DataTypes.STRING(1024),
    },
    refreshToken: {
      allowNull: false,
      type: DataTypes.STRING(1024),
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    expirationDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    exitDate: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'UserTokens',
    tableName: 'user_tokens',
  });

  return UserTokens;
};
