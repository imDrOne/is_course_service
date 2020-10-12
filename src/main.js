const express = require('express');
const { connect: dbConnection, sequelize } = require('./config');
const { User } = require('./models');

const app = express();
const PORT = process.env.APP_HOST || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

(async (schema, options) => {
  try {
    await dbConnection();
    await sequelize.sync({ force: true });
    await sequelize.createSchema('main', options);
    app.listen(PORT);
  } catch (e) {
    process.exit(1);
  }
})();
