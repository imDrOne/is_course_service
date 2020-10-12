const dotenv = require('dotenv');

dotenv.config();
const sequelize = require('./sequelize.config');

module.exports = {
  sequelize,
};
