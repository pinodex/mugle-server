const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');

const { port } = require('@config/app');
const routes = require('@routes');

const server = Hapi.server({
  port,

  router: {
    stripTrailingSlash: true
  }
});

server.route(routes);

exports.start = async () => {
  await server.register(Nes);
  await server.start();

  console.log('Server running on %s', server.info.uri);
};
