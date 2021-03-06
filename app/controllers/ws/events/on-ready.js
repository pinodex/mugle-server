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

    await peerService.setReadyStatus(id, true);
  } catch (error) {
    if (error instanceof PeerNotFound
        || error instanceof PeerExpired) {
      socket.disconnect();
    }
  }
};
