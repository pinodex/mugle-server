const controllers = require('@controllers/api/ice-servers');
const route = require('@helpers/route');

module.exports = [
  route('GET', '/', controllers.all),
];
