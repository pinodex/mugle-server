const cron = require('node-cron');
const findMatches = require('@tasks/find-matches');
const importXirsysIce = require('@tasks/import-xirsys-ice');

exports.run = (server) => {
  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });

  cron.schedule('0 */12 * * *', () => {
    importXirsysIce();
  });
};
