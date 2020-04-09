const logger = require('@services/logger');
const peerService = require('@services/peer');

let previousPeersLength = 0;

/**
 * Shuffle array
 *
 * @param  {Array} inputArray
 * @return {Array}
 */
const shuffle = (inputArray) => {
  const array = inputArray;

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

/**
 * Build socket index
 *
 * @param  {Object} server Server instance
 * @return {Object}
 */
const buildSocketIndex = async (server) => {
  const socketIndex = {};

  await server.eachSocket(async (socket) => {
    socketIndex[socket.id] = socket;
  });

  return socketIndex;
};

/**
 * Pair matches
 *
 * @param  {Array} matches Matches array
 */
const pairMatches = async (server, matches) => {
  const socketIndex = await buildSocketIndex(server);

  matches.forEach(([firstPeer, secondPeer]) => {
    logger.info(`Matching ${firstPeer.socketId} with ${secondPeer.socketId}`);

    const firstSocket = socketIndex[firstPeer.socketId] || null;
    const secondSocket = socketIndex[secondPeer.socketId] || null;

    if (firstSocket === null) {
      logger.error(`Cannot find socket for ${firstPeer.socketId}`);

      return;
    }

    if (secondSocket === null) {
      logger.error(`Cannot find socket for ${secondPeer.socketId}`);

      return;
    }

    firstSocket.publish('/ws/peer/match', secondPeer._id);
    secondSocket.publish('/ws/peer/match', firstPeer._id);

    peerService.occupy(firstPeer, secondPeer);
  });
};

module.exports = async (server) => {
  let peers = await peerService.findForPairing();

  const matches = [];

  if (peers.length !== previousPeersLength) {
    logger.info(`Found ${peers.length} peers for pairing`);
  }

  previousPeersLength = peers.length;

  if (peers.length < 2) {
    return;
  }

  peers = shuffle(peers);

  while (peers.length > 1) {
    matches.push([
      peers.pop(),
      peers.pop(),
    ]);
  }

  await pairMatches(server, matches);
};
