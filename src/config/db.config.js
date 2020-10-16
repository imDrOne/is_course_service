const { sequelize, umzug } = require('../db/models');

const env = process.env.NODE_ENV || 'development';

const {
  database, username, password, ...options
} = require('./migration.config')[env];

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
      console.log('Connecting to database...');
      sequelize.authenticate()
        .then(() => {
          console.log('Successful connection to data base...');
          resolve();
        })
        .catch((error) => {
          console.log(`FUCK: \n${error}`);
          reject();
        });
    });
  }

  static upMigration() {
    umzug.up();
  }
}

module.exports = {
  DB,
};
