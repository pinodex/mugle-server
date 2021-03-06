const bootstrap = require('../bootstrap');
const importTwilioNtsIce = require('@tasks/import-twilio-nts-ice');

bootstrap().then(async () => {
  await importTwilioNtsIce();

  process.exit(0);
});
