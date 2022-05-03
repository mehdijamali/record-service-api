const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();
const { port, deployedSeverUri } = require('../../../config/vars');

const options = {
  swaggerDefinition: {
    openapi: '3.0.3',
    info: {
      title: 'Record Service API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `${deployedSeverUri}/api/v1/`,
        description: 'Deployed Server',
      },
      {
        url: `http://localhost:${port}/api/v1`,
        description: 'Local server',
      },
    ],
  },
  apis: ['src/api/routes/v1/*.js'],
};

const swaggerSpecs = swaggerJsdoc(options);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpecs));

module.exports = router;
