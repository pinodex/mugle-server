const bootstrap = require('./bootstrap');
const { start } = require('./server');
const cron = require('@services/cron');

process.on('unhandledRejection', (err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});

bootstrap().then(async () => {
  const server = await start();

  cron.run(server);
});
