const Joi = require('@hapi/joi');
const axios = require('axios');
const logger = require('@services/logger');
const iceService = require('@services/ice-server');
const iceServerSchema = require('@services/ice-server/schema');
const { username, password, channel } = require('@config/xirsys');

const schema = Joi.array().items(iceServerSchema);

module.exports = async () => {
  logger.info('Getting Xirsys ICE server list');

  const url = `https://global.xirsys.net/_turn/${channel}`;
  const auth = { username, password };

  let iceServers = [];

  try {
    const { data } = await axios.put(url, {}, { auth });

    if (!data) {
      throw new Error('No response from server');
    }

    if (data.s !== 'ok') {
      throw new Error(data.v);
    }

    iceServers = data.v.iceServers;

    await schema.validateAsync(iceServers);
  } catch (err) {
    logger.error('An error occurred while getting Xirsys ICE server list');
    logger.error(err.message);

    return;
  }

  logger.info('Removing existing ICE servers');

  await iceService.deleteAll();

  await iceService.createMany(iceServers);

  logger.info(`Added ${iceServers.length} ICE servers`);
};
