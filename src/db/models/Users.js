const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Permissions, {
        through: 'UsersAsPermissions',
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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
  }, {
    sequelize,
    timestamp: false,
    modelName: 'Users',
    tableName: 'users',
  });

  return Users;
};
