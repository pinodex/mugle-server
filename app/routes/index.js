const prefixRoutes = require('@helpers/prefix-routes');
const api = require('./api');

module.exports = [
  ...prefixRoutes('api', api),
];
