const controllers = require('@controllers/api/peers');
const route = require('@helpers/route');

module.exports = [
  route('GET', '/{id}', controllers.get),
];
