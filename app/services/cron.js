const cron = require('node-cron');
const findMatches = require('@tasks/find-matches');

exports.run = (server) => {
  cron.schedule('*/1 * * * * *', () => {
    findMatches(server);
  });
};
