const Peer = require('@models/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');
const { PEER_LIFETIME_SECONDS } = require('@models/constants');

/**
 * Get peer
 *
 * @param  {String} id Peer ID
 * @return {Peer}
 */
exports.get = async (id) => {
  const peer = await Peer.findById(id);

  if (!peer) {
    throw new PeerNotFound();
  }

  return peer;
};

/**
 * Get peer by socket ID
 *
 * @param  {String} socketId Socket ID
 * @return {Peer}
 */
exports.getBySocketId = async (socketId) => {
  const peer = await Peer.findOne({ socketId }).exec();

  if (!peer) {
    throw new PeerNotFound();
  }

  return peer;
};

/**
 * Create Peer
 *
 * @param {String} socketID Socket ID
 * @return {String} Peer ID
 */
exports.create = async (socketId) => {
  const peer = await Peer.create({
    socketId,
    lastRefresh: new Date(),
  });

  return peer.id;
};

/**
 * Refresh Peer
 *
 * @param  {String} id Peer ID
 */
exports.refresh = async (id) => {
  const peer = await Peer.findById(id);

  if (!peer) {
    throw new PeerNotFound();
  }

  if (peer.isExpired) {
    throw new PeerExpired();
  }

  peer.lastRefresh = new Date();

  await peer.save();
};

/**
 * Set Peer ready status
 *
 * @param  {String}  id       Peer ID
 * @param  {Boolean} isReady  Socket ready status
 */
exports.setReadyStatus = async (id, isReady) => {
  const peer = await this.get(id);

  if (peer.isExpired) {
    throw new PeerExpired();
  }

  peer.isReady = isReady;

  await peer.save();
};

/**
 * Set Peer occupied status
 *
 * @param  {String}  id         Peer ID
 * @param  {Boolean} isOccupied Peer occupied status
 */
exports.setOccupiedStatus = async (id, isOccupied) => {
  const peer = await this.get(id);

  if (peer.isExpired) {
    throw new PeerExpired();
  }

  peer.isOccupied = isOccupied;

  await peer.save();
};

/**
 * Delete Peer
 *
 * @param  {String} id Peer ID
 */
exports.delete = async (id) => {
  await Peer.findByIdAndDelete(id);
};

/**
 * Set peers occupied status to true
 *
 * @param  {String[]} peerIds List of Peer IDs
 */
exports.occupyMany = async (peerIds) => {
  const query = {
    _id: {
      $in: peerIds,
    },
  };

  const doc = {
    isOccupied: true,
  };

  await Peer.updateMany(query, doc);
};

/**
 * Find Peers that is vacant and ready
 *
 * @return {Peer}
 */
exports.findForPairing = async () => {
  const lifetimeThreshold = new Date(new Date().getTime() - PEER_LIFETIME_SECONDS);

  const peers = await Peer.find({
    isOccupied: false,
    isReady: true,

    lastRefresh: {
      $gt: lifetimeThreshold,
    },
  });

  return peers;
};
