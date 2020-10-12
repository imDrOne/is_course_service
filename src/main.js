const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { connect: dbConnection, sequelize } = require('./config');
const birds = require('./router/controllers/auth.controller');
const swaggerDocument = require('./swagger-ui.json');

const app = express();
const PORT = process.env.APP_HOST || 3000;
const BASE_API_URL = `/${process.env.APP_API_VERSION}/api/uis-dashboard-service`;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Tikholoz A. UIS - 411. [SERVICE]');
});

app.use(`${BASE_API_URL}/auth-controller`, birds);

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
