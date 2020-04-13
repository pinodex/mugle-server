const cron = require('node-cron');
const logger = require('@services/logger');
const findMatches = require('@tasks/find-matches');
const importTwilioNtsIce = require('@tasks/import-twilio-nts-ice');
const { env } = require('@config/app');

exports.run = (server) => {
  logger.info('Starting cron');

  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });

  if (env === 'production') {
    cron.schedule('0 */12 * * *', () => {
      importTwilioNtsIce();
    });
  }
};
