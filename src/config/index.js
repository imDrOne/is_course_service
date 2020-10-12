const dotenv = require('dotenv');

dotenv.config();
const { sequelize, connect } = require('./sequelize.config');

module.exports = {
  sequelize,
  connect,
};
