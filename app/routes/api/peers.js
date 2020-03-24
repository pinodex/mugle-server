const controllers = require('@controllers/api/peers');
const route = require('@helpers/route');

module.exports = [
  route('POST', '/', controllers.create),
  route('POST', '/{id}/refresh', controllers.refresh),
];
