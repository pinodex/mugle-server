const prefixRoutes = require('@helpers/prefix-routes');
const sessions = require('./sessions');

module.exports = [
  ...prefixRoutes('sessions', sessions)
];
