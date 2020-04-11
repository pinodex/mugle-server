const cron = require('node-cron');
const findMatches = require('@tasks/find-matches');
const importTwilioNts = require('@tasks/import-twilio-nts');

exports.run = (server) => {
  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });

  cron.schedule('0 */12 * * *', () => {
    importTwilioNts(server);
  });
};
