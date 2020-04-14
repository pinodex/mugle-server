require('../bootstrap');

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { start } = require('../server');

exports.lab = Lab.script();

const {
  after,
  before,
  describe,
  it,
} = exports.lab;

let server = null;

before(async () => {
  server = await start();
});

after(async () => {
  await server.stop();
});

describe('GET /', () => {
  it('responds with 404', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });

    expect(res.statusCode).to.equal(404);

    expect(res.result).to.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  });
});
