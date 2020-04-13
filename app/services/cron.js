const cron = require('node-cron');
const findMatches = require('@tasks/find-matches');
const importTwilioNtsIce = require('@tasks/import-twilio-nts-ice');
const { env } = require('@config/app');

exports.run = (server) => {
  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });

  if (env === 'production') {
    cron.schedule('0 */12 * * *', () => {
      importTwilioNtsIce();
    });
  }
};
