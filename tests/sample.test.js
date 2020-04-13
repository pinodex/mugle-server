require('../bootstrap');

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { init: loggerInit } = require('@services/logger');
const { start } = require('../server');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();

loggerInit();

describe('GET /', () => {
  let server = null;

  beforeEach(async () => {
    server = await start();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 404', async () => {
    const res = await server.inject({
        method: 'get',
        url: '/'
    });

    expect(res.statusCode).to.equal(404);

    expect(res.result).to.equal({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    });
  });
});
