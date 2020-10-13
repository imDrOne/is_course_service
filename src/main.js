const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { DB } = require('./config');
const birds = require('./router/controllers/auth.controller');
const swaggerDocument = require('./swagger-ui.json');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_API_URL = `/${process.env.APP_API_VERSION}/api/uis-dashboard-service`;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Tikholoz A. UIS - 411. [SERVICE]');
  res.json(req);
});

app.use(`${BASE_API_URL}/auth-controller`, birds);

(async () => {
  try {
    await DB.connect();
    await DB.createSchema();
    await DB.synchronize();
    app.listen(PORT);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
