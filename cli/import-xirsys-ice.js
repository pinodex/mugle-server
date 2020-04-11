const bootstrap = require('../bootstrap');
const importXirsysIce = require('@tasks/import-xirsys-ice');

bootstrap().then(async () => {
  await importXirsysIce();

  process.exit(0);
});
