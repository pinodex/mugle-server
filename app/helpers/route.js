const Boom = require('@hapi/boom');

/**
 * Prepare route and controller
 *
 * @param  {String} method Route method
 * @param  {String} path Route path
 * @param  {Object} action Route action
 * @return {Object}
 */
module.exports = function route(method, path, { options, handler }) {
  const handlerFn = handler || function error() {
    return Boom.notImplemented();
  };

  return {
    method,
    path,
    options: options || {},
    handler: handlerFn,
  };
};
