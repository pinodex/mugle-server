/**
 * Prefix routes path
 *
 * @param  {String} prefix Route prefix
 * @param  {Array} routes Route list
 * @return {Array}
 */
module.exports = (prefix, routes) => routes.map((route) => {
  const newRoute = { ...route };

  newRoute.path = (`/${prefix}${newRoute.path}`).replace(/\/+$/, '');

  return newRoute;
});
