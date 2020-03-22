const Redis = require('ioredis');
const { host, port, password, db, tls } = require('@config/redis');

const proto = tls ? 'rediss' : 'redis';

const url = password
  ? `${proto}://:${password}@${host}:${port}/${db}`
  : `${proto}://${host}:${port}/${db}`;

const instance = new Redis(url);

module.exports = instance;
