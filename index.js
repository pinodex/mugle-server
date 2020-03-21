'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');

const { port } = require('./config/app');
const server = Hapi.server({ port });

const init = async () => {
  await server.register(Nes);

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
