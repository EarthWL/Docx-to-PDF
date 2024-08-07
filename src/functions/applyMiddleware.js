const bodyParser = require('body-parser');
const actuator = require('express-actuator');

const applyMiddleware = (server) => {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(actuator());
};

module.exports = { applyMiddleware };
