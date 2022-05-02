const app = require('./config/express');
const { port } = require('./config/vars');

const server = app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`));

module.exports = server;
