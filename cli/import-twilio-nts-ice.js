const bootstrap = require('../bootstrap');
const importTwilioNts = require('@tasks/import-twilio-nts');

bootstrap().then(async () => {
  await importTwilioNts();

  process.exit(0);
});
