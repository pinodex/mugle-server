const path = require('path');
const moduleAlias = require('module-alias');

require('dotenv').config();

moduleAlias.addAliases({
  '@root': __dirname,
  '@config': path.join(__dirname, 'config'),
  '@controllers': path.join(__dirname, 'app', 'controllers'),
  '@helpers': path.join(__dirname, 'app', 'helpers'),
  '@jobs': path.join(__dirname, 'app', 'jobs'),
  '@models': path.join(__dirname, 'app', 'models'),
  '@routes': path.join(__dirname, 'app', 'routes'),
  '@services': path.join(__dirname, 'app', 'services'),
});

const { connect: mongooseConnect } = require('@services/mongoose');
const { init: loggerInit } = require('@services/logger');

module.exports = async () => {
  const logger = loggerInit();

  const mongoose = await mongooseConnect();

  return {
    logger,
    mongoose,
  }
};
