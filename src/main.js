const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

// Init app express
const app = express();

// Data Base
const { DB } = require('./config');

// Controllers
const auth = require('./router/controllers/auth.controller');
const users = require('./router/controllers/users.controller');
const permissions = require('./router/controllers/permissions.controller');

// Swagger
const swaggerDocument = require('./swagger-ui.json');

// Vars
const PORT = process.env.PORT || 3000;
const BASE_API_URL = `/${process.env.APP_API_VERSION}/api/uis-dashboard-service`;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Tikholoz A. UIS - 411. [SERVICE]');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`${BASE_API_URL}/auth-controller`, auth);
app.use(`${BASE_API_URL}/users-controller`, users);
app.use(`${BASE_API_URL}/permissions-controller`, permissions);

// Start service
(async () => {
  try {
    await DB.connect();
    await DB.createSchema();
    await DB.upMigration();

    app.listen(PORT);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
