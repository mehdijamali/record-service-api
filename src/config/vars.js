require('dotenv-safe').config();

module.exports = {
  port: process.env.PORT || 8080,
  dbUri: process.env.DB_URI,
  deployedSeverUri: process.env.DEPLOYED_SERVER_URI,
};
