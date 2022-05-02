require('dotenv-safe');

module.exports = {
  port: process.env.PORT || 8080,
  dbUri: process.env.DB_URI,
};
