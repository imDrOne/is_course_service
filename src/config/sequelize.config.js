const { Sequelize } = require('sequelize');

const {
  DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT,
  schema: 'main',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connect = () => new Promise((resolve, reject) => {
  sequelize.authenticate()
    .then(() => {
      resolve('connected to DB');
    })
    .catch((error) => {
      reject(`FUCK \n${error}`);
    });
});

module.exports = {
  connect,
  sequelize,
};
