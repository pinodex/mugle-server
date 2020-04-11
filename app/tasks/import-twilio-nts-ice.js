const twilio = require('twilio');
const logger = require('@services/logger');
const iceService = require('@services/ice-server');
const { accountSid, authToken } = require('@config/twilio');

const client = twilio(accountSid, authToken);

module.exports = async () => {
  let token = null;

  logger.info('Creating Twilio NTS token');

  try {
    token = await client.tokens.create();
  } catch (err) {
    logger.error('An error occurred while creating Twilio NTS token');
    logger.error(err.message);

    return;
  }

  const { iceServers } = token;

  if (!iceServers) {
    logger.error('Cannot find ICE servers');

    return;
  }

  logger.info('Removing existing ICE servers');

  await iceService.deleteAll();

  await iceService.createMany(iceServers);

  logger.info(`Added ${iceServers.length} ICE servers`);
};
