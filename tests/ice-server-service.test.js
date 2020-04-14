require('../bootstrap');

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const mongooseTestDb = require('@tests/helpers/mongoose');
const mockIceServers = require('@tests/mocks/mock-ice-servers');
const iceServerService = require('@services/ice-server');

exports.lab = Lab.script();

const {
  after,
  before,
  describe,
  it,
} = exports.lab;

before(async () => {
  await mongooseTestDb.connect();
});

after(async () => {
  await mongooseTestDb.disconnect();
});

describe('ICE Server Service', () => {
  it('creates many ICE servers', async () => {
    const result = await iceServerService.createMany(mockIceServers);

    expect(result).to.be.an.array();

    expect(result).to.have.length(mockIceServers.length);
  });

  it('returns all ICE servers', async () => {
    const result = await iceServerService.all(mockIceServers);

    expect(result).to.be.an.array();

    expect(result.length).to.equal(mockIceServers.length);

    result.forEach((item) => {
      const keys = Object.keys(item.toObject());

      expect(keys).to.equal([
        'url',
        'urls',
        'maxRateKbps',
        'username',
        'credential',
      ]);
    });
  });

  it('deletes all ICE servers', async () => {
    await iceServerService.deleteAll();

    const result = await iceServerService.all(mockIceServers);

    expect(result).to.be.an.array();

    expect(result).to.be.an.empty();
  });
});
