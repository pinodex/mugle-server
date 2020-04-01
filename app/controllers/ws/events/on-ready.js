const peerService = require('@services/peer');
const { PeerNotFound, PeerExpired } = require('@services/peer/errors');

/**
 * On Presence event
 *
 * @param  {Socket} socket
 */
module.exports = async (socket) => {
  try {
    await peerService.setAsReadyBySocketId(socket.id);
  } catch (error) {
    if (error instanceof PeerNotFound
        || error instanceof PeerExpired) {
      socket.disconnect();
    }
  }
};
