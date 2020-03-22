const controllers = require('@controllers/api/sessions');
const route = require('@helpers/route');

module.exports = [
  route('GET', '/{id}', controllers.get),
  route('POST', '/', controllers.create),
  route('PUT', '/{id}', controllers.addPeer)
];
