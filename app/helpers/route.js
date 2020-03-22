/**
 * Prepare route and controller
 *
 * @param  {String} method Route method
 * @param  {String} path Route path
 * @param  {Object} action Route action
 * @return {Object}
 */
module.exports = (method, path, { options, handler }) => ({
  method,
  path,
  options,
  handler,
});
