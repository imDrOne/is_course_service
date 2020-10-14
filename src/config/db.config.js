const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const {
  database, username, password, ...options
} = require('./migration.config')[env];

const sequelize = new Sequelize(database, username, password, {
  ...options,
});

class DB {
  static synchronize() {
    sequelize.sync({ force: true })
      .then(() => console.log('Sync success'))
      .catch((reason) => console.error(`Error: ${reason}`));
  }

  static createSchema() {
    sequelize.createSchema(options.schema, options)
      .then(() => console.log('Schema created'))
      .catch((reason) => console.error(`Error: ${reason}`));
  }

  static connect() {
    return new Promise((resolve, reject) => {
      sequelize.authenticate()
        .then(() => {
          resolve('Successful connection to data base...');
        })
        .catch((error) => {
          reject(`FUCK: \n${error}`);
        });
    });
  }
}

module.exports = {
  DB,
};
