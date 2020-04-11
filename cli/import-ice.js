const fs = require('fs');
const parseArgs = require('minimist');

const Bourne = require('@hapi/bourne');
const Joi = require('@hapi/joi');

const bootstrap = require('../bootstrap');
const logger = require('@services/logger');
const iceServerService = require('@services/ice-server');

const schema = Joi.array().items(Joi.object({
  url: Joi
    .string()
    .required(),

  maxRateKbps: Joi
    .number()
    .allow(null),

  username: Joi
    .string()
    .allow(null),

  credential: Joi
    .string()
    .allow(null),
}));

const parseJsonFile = (path) => {
  const fileContents = fs.readFileSync(path, 'utf8');

  let data = [];

  try {
    data = Bourne.parse(fileContents);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }

  return data;
};

const validate = async (data) => {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

bootstrap().then(async () => {
  const { o: overwrite, json } = parseArgs(process.argv.slice(2));

  const fileExists = fs.existsSync(json);

  if (!fileExists) {
    logger.error(`Cannot find file specified: ${json}`);
    process.exit(1);
  }

  const data = parseJsonFile(json);

  await validate(data);

  if (overwrite) {
    await iceServerService.deleteAll();
  }

  await iceServerService.createMany(data);

  logger.info(`Imported ${data.length} entries`);

  process.exit(0);
});
