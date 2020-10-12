const express = require('express');
const { sequelize: dbConnection } = require('./config');

const app = express();
const PORT = process.env.APP_HOST || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

(async () => {
  try {
    await dbConnection();
    app.listen(PORT);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
