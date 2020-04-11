const cron = require('node-cron');
const findMatches = require('@tasks/find-matches');
const importTwilioNtsIce = require('@tasks/import-twilio-nts-ice');

exports.run = (server) => {
  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });

  cron.schedule('0 */12 * * *', () => {
    importTwilioNtsIce();
  });
};
