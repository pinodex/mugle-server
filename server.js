const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');

const DevErrors = require('hapi-dev-errors');

const { env, port } = require('@config/app');
const routes = require('@routes');

const validateFailAction = require('@helpers/validate-fail-action');

const cron = require('@services/cron');

const wsEvents = require('@controllers/ws/events');
const wsSubscriptions = require('@controllers/ws/subscriptions');

const server = Hapi.server({
  port,

  router: {
    stripTrailingSlash: true,
  },

  routes: {
    cors: true,

    validate: {
      options: {
        abortEarly: false,
      },

      failAction: validateFailAction,
    },
  },
});

server.route(routes);

exports.start = async () => {
  await server.register({
    plugin: DevErrors,

    options: {
      showErrors: env !== 'production',
    },
  });

  await server.register({
    plugin: Nes,

    options: {
      ...wsEvents,
    },
  });

  wsSubscriptions.forEach(({ path, options }) => server.subscription(path, options));

  await server.start();

  cron.run(server);

  process.stdout.write(`Server running on ${server.info.uri}\n`);
};
