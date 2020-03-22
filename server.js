const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');

const devErrors = require('hapi-dev-errors');

const { env, port } = require('@config/app');
const routes = require('@routes');

const validateFailAction = require('@helpers/validate-fail-action');

const server = Hapi.server({
  port,

  router: {
    stripTrailingSlash: true,
  },

  routes: {
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
    plugin: devErrors,

    options: {
      showErrors: env !== 'production',
    },
  });

  await server.register(Nes);

  await server.start();

  process.stdout.write(`Server running on ${server.info.uri}\n`);
};
