const controllers = require('@controllers/api/sessions');

module.exports = [
  {
    method: 'POST',
    path: '/',
    handler: controllers.create
  }
];
