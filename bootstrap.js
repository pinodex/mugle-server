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
  '@tasks': path.join(__dirname, 'app', 'tasks'),
  '@tests': path.join(__dirname, 'tests'),
});

const { connect: mongooseConnect } = require('@services/mongoose');
const { init: loggerInit } = require('@services/logger');

const logger = loggerInit();

module.exports = async () => {
  const mongoose = await mongooseConnect();

  return {
    mongoose,
  };
};
