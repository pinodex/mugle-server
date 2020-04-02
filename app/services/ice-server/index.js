const IceServer = require('@models/ice-server');

/**
 * Get ice servers
 *
 * @return {Array}
 */
exports.all = async () => {
  const iceServers = await IceServer.find({});

  return iceServers;
};

/**
 * Create many ice servers
 *
 * @param  {Array} data Array of ice server objects
 * @return {Array}
 */
exports.createMany = async (data) => {
  const result = await IceServer.create(data);

  return result;
};

/**
 * Delete all
 */
exports.deleteAll = async () => {
  await IceServer.deleteMany({});
};
