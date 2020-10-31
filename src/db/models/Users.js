const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Permissions, {
        through: 'UsersAsPermissions',
        foreignKey: 'userId',
        as: 'permissions',
      });
      Users.hasMany(models.UserTokens, {
        foreignKey: 'userId',
      });
    }
  }

  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Данный почтовый адрес не валиден',
        },
      },
      unique: {
        args: true,
        msg: 'Данный почтовый адрес уже используется',
      },
    },
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Users',
    tableName: 'users',
  });

  return Users;
};
