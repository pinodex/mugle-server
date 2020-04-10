const peerService = require('@services/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');

/**
 * On Presence event
 *
 * @param  {Socket} socket
 */
module.exports = async (socket) => {
  try {
    const { id } = await peerService.getBySocketId(socket.id);

    peerService.setReadyStatus(id, false);
    peerService.setOccupiedStatus(id, false);
  } catch (error) {
    if (error instanceof PeerNotFound
        || error instanceof PeerExpired) {
      socket.disconnect();
    }
  }
};
