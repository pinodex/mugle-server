const prefixRoutes = require('@helpers/prefix-routes');
const peers = require('./peers');

module.exports = [
  ...prefixRoutes('peers', peers),
];
