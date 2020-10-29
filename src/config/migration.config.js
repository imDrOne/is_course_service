const dotenv = require('dotenv');

dotenv.config();

const {
  DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    schema: 'main',
    searchPath: 'main',
    timezone: '+03:00',
    dialectOptions: {
      prependSearchPath: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    schema: 'main',
    searchPath: 'main',
    timezone: '+03:00',
    dialectOptions: {
      prependSearchPath: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    schema: 'main',
    searchPath: 'main',
    timezone: '+03:00',
    dialectOptions: {
      prependSearchPath: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
