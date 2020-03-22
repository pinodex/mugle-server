'use strict';

const path = require('path');
const moduleAlias = require('module-alias');

require('dotenv').config();

moduleAlias.addAliases({
  '@root': __dirname,
  '@config': path.join(__dirname, 'config'),
  '@controllers': path.join(__dirname, 'app', 'controllers'),
  '@routes': path.join(__dirname, 'app', 'routes'),
  '@services': path.join(__dirname, 'app', 'services'),
  '@helpers': path.join(__dirname, 'app', 'helpers'),
});

const server = require('./server');

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

server.start();
