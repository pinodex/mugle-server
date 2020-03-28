const bootstrap = require('./bootstrap');
const server = require('./server');

process.on('unhandledRejection', (err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});

bootstrap();

server.start();
