const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Данный почтовый адрес не валиден',
        },
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
    modelName: 'User',
    tableName: 'Users',
  });

  return User;
};
