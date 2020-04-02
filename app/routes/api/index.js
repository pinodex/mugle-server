const prefixRoutes = require('@helpers/prefix-routes');
const peers = require('./peers');
const iceServers = require('./ice-servers');

module.exports = [
  ...prefixRoutes('peers', peers),
  ...prefixRoutes('ice-servers', iceServers),
];
