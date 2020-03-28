const bootstrap = require('./bootstrap');
const server = require('./server');
const cron = require('@services/cron');

process.on('unhandledRejection', (err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});

bootstrap().then(() => {
  cron.run();

  server.start();
});
