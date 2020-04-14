require('../bootstrap');

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { ObjectID } = require('bson');
const mongooseTestDb = require('@tests/helpers/mongoose');
const peerService = require('@services/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');

exports.lab = Lab.script();

const {
  after,
  before,
  describe,
  it,
} = exports.lab;

/**
 * Generate random string
 *
 * @return {String}
 */
const generateRandomString = () => Math.random().toString(36).slice(2);

/**
 * Get date range with interval of +/- milliseconds
 *
 * @param  {Number} ms Interval in milliseconds
 * @return {Array}     Array of Date objects
 */
const getDateRangeMsInterval = (ms) => ([
  new Date(new Date().getTime() - ms),
  new Date(new Date().getTime() + ms),
]);

/**
 * Subtract milliseconds to current Date object
 *
 * @param  {Number} ms
 * @return {Date}
 */
const subtractMsToCurrentDate = (ms) => new Date(new Date().getTime() - ms);

/**
 * Generate Peer
 *
 * @return {Promise} Promise to create Peer
 */
const generatePeer = () => peerService.create(generateRandomString());

/**
 * Generate Socket ID and Peer
 *
 * @return {Object}
 */
const generateSocketIdAndPeer = async () => {
  const socketId = generateRandomString();

  const peerId = await peerService.create(socketId);

  return { peerId, socketId };
};

before(async () => {
  await mongooseTestDb.connect();
});

after(async () => {
  await mongooseTestDb.disconnect();
});

describe('Peer Service', () => {
  it('creates Peer', async () => {
    const id = await generatePeer();

    expect(id).to.be.a.string();
  });

  it('gets Peer', async () => {
    const { peerId, socketId } = await generateSocketIdAndPeer();
    const result = await peerService.get(peerId);

    expect(result).to.be.an.object();
    expect(result.socketId).to.equal(socketId);
  });

  it('throws PeerNotFound on get Peer by invalid id', async () => {
    const getPeerPromise = peerService.get(new ObjectID());

    await expect(getPeerPromise).to.reject(PeerNotFound);
  });

  it('gets Peer by socket ID', async () => {
    const { peerId, socketId } = await generateSocketIdAndPeer();
    const result = await peerService.getBySocketId(socketId);

    expect(result).to.be.an.object();
    expect(result.id).to.equal(peerId);
  });

  it('throws PeerNotFound on get Peer by invalid socket id', async () => {
    const getPeerPromise = peerService.getBySocketId(generateRandomString());

    await expect(getPeerPromise).to.reject(PeerNotFound);
  });

  it('refreshes Peer', async () => {
    const id = await generatePeer();

    await peerService.refresh(id);

    const result = await peerService.get(id);

    expect(result).to.be.an.object();
    expect(result.lastRefresh).to.be.a.date();
    expect(result.lastRefresh).to.be.within(...getDateRangeMsInterval(2000));
  });

  it('throws PeerExpired when refreshing expired Peer', async () => {
    const id = await generatePeer();
    const result = await peerService.get(id);

    result.lastRefresh = subtractMsToCurrentDate(6000);
    await result.save();

    const refreshPeerPromise = peerService.refresh(id);

    await expect(refreshPeerPromise).to.reject(PeerExpired);
  });

  it('sets Peer ready status', async () => {
    const id = await generatePeer();

    await peerService.setReadyStatus(id, true);
    let result = await peerService.get(id);

    expect(result).to.be.an.object();
    expect(result.isReady).to.be.a.boolean();
    expect(result.isReady).to.equal(true);

    await peerService.setReadyStatus(id, false);
    result = await peerService.get(id);

    expect(result.isReady).to.equal(false);
  });

  it('throws PeerExpired when setting expired Peer ready status', async () => {
    const id = await generatePeer();
    const result = await peerService.get(id);

    result.lastRefresh = subtractMsToCurrentDate(6000);
    await result.save();

    const setPeerReadyStatusPromise = peerService.setReadyStatus(id, true);

    await expect(setPeerReadyStatusPromise).to.reject(PeerExpired);
  });

  it('sets Peer occupied status', async () => {
    const id = await generatePeer();

    await peerService.setOccupiedStatus(id, true);
    let result = await peerService.get(id);

    expect(result).to.be.an.object();
    expect(result.isOccupied).to.be.a.boolean();
    expect(result.isOccupied).to.equal(true);

    await peerService.setOccupiedStatus(id, false);
    result = await peerService.get(id);

    expect(result.isOccupied).to.equal(false);
  });

  it('throws PeerExpired when setting expired Peer occupied status', async () => {
    const id = await generatePeer();
    const result = await peerService.get(id);

    result.lastRefresh = subtractMsToCurrentDate(6000);
    await result.save();

    const setPeerOccupiedStatusPromise = peerService.setOccupiedStatus(id, true);

    await expect(setPeerOccupiedStatusPromise).to.reject(PeerExpired);
  });

  it('deletes Peer', async () => {
    const id = await generatePeer();

    await peerService.delete(id);

    const getPeerPromise = peerService.get(id);

    await expect(getPeerPromise).to.reject(PeerNotFound);
  });

  it('occupies many Peer', async () => {
    const count = 3;
    const ids = await Promise.all([...Array(count)].map(generatePeer));

    await peerService.occupyMany(ids);

    const peers = await Promise.all(ids.map((id) => peerService.get(id)));

    for (let i = 0; i < peers.length; i += 1) {
      expect(peers[i].isOccupied).to.equal(true);
    }
  });

  it('finds Peer for pairing', async () => {
    const count = 2;

    const generatePeerForPairing = async () => {
      const id = await generatePeer();

      await peerService.refresh(id);
      await peerService.setReadyStatus(id, true);

      return id;
    };

    const ids = await Promise.all([...Array(count)].map(generatePeerForPairing));

    const pair = await peerService.findForPairing();

    expect(pair).to.be.array();
    expect(pair).to.have.length(2);

    pair.forEach((peer) => {
      expect(peer).to.satisfy(({ id }) => ids.includes(id));
    });
  });
});
